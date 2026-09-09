/**
 * Redirector de www.inspectia.ai al ápice.
 *
 * **Por qué existe un servicio aparte para veinte líneas.** El sitio ya redirige `www` en
 * `src/server.ts`, pero eso sólo alcanza a lo que pasa por el entry del servidor: Nitro
 * sirve `public/` y `/assets/` en un middleware global que corre antes, así que
 * `www.inspectia.ai/favicon.ico`, `/img/**` y `/assets/**` respondían 200 en el host
 * equivocado. Se probaron las dos vías dentro de la aplicación y ninguna sirve: un
 * middleware propio declarado en `handlers` se registra *después* del de estáticos, y las
 * `routeRules` de Nitro, que sí corren antes, son ciegas al host —una regla que redirija
 * en `www` redirigiría también en el ápice—.
 *
 * La salida es sacar `www` de la aplicación por completo. El mapeo de dominio de
 * `www.inspectia.ai` apunta acá, este servicio no sabe servir nada, y entonces no hay
 * ningún camino por el que un archivo salga con ese nombre de host.
 *
 * Escala a cero y no tiene dependencias, así que no cuesta prácticamente nada.
 */
import { createServer } from "node:http";

/** A dónde va todo. Se puede pisar por entorno, pero el valor bueno es el de acá. */
const TARGET = new URL(process.env.TARGET_ORIGIN ?? "https://inspectia.ai");

const PORT = Number(process.env.PORT ?? 8080);

/* Los desafíos de certificado NO se redirigen.
 *
 * Cuando se creó el primer mapeo de dominio, la aplicación devolvía un 302 a cada
 * `/.well-known/acme-challenge/…` y eso llenó los registros de Cloud Run mientras el
 * certificado no terminaba de emitirse. Google resuelve el desafío en su frontend y estas
 * peticiones no deberían llegar hasta acá, pero si llegan, un 404 es la respuesta honesta:
 * este servicio no tiene el token, y mandar al validador a otro nombre de host es
 * justamente lo que no hay que hacer. */
const ACME = "/.well-known/acme-challenge/";

const server = createServer((req, res) => {
  const host = (req.headers.host ?? "").split(":")[0].toLowerCase();

  /* Si alguien apunta este servicio al mismo nombre al que redirige, cada respuesta sería
   * un salto a sí misma y el navegador cortaría con "demasiadas redirecciones", que no
   * dice nada sobre la causa. Mejor contestar y que se lea el error. */
  if (host === TARGET.hostname) {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end(`Mal configurado: este redirector responde por ${host}, que es su propio destino.\n`);
    return;
  }

  // `req.url` viene como ruta y consulta, pero un cliente puede mandar una forma absoluta
  // o algo como "//otro.host/x". Normalizar deja sólo la ruta y la consulta, y con eso el
  // destino siempre queda dentro del origen propio.
  let destino;
  try {
    const pedido = new URL(req.url ?? "/", "http://placeholder.invalid");
    if (pedido.pathname.startsWith(ACME)) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("No encontrado\n");
      return;
    }
    destino = `${TARGET.origin}${pedido.pathname}${pedido.search}`;
  } catch {
    destino = TARGET.origin;
  }

  /* 301 para lo que se navega y 308 para el resto.
   *
   * El 301 es el que Google lee como "esta dirección se mudó" y consolida en el ápice, que
   * es todo el punto del servicio. Pero el 301 permite que el cliente cambie el método a
   * GET: si algún día alguien manda un POST a `www`, con 301 el cuerpo se pierde en
   * silencio. El 308 dice lo mismo y obliga a conservar método y cuerpo. */
  const permanente = req.method === "GET" || req.method === "HEAD" ? 301 : 308;

  res.writeHead(permanente, {
    location: destino,
    // Una hora y no para siempre. Un 301 sin `cache-control` lo cachea el navegador por
    // tiempo indefinido, y si algún día hay que deshacer esto, los visitantes que ya
    // pasaron seguirían saltando durante meses sin forma de avisarles.
    "cache-control": "public, max-age=3600",
    "strict-transport-security": "max-age=31536000; includeSubDomains",
    "x-content-type-options": "nosniff",
    "content-length": "0",
  });
  res.end();
});

// 0.0.0.0 explícito: atado a localhost el contenedor arranca bien y no contesta una sola
// petición, que es de los errores más difíciles de ver porque no falla, no responde.
server.listen(PORT, "0.0.0.0", () => {
  console.log(`www-redirect escuchando en :${PORT} → ${TARGET.origin}`);
});
