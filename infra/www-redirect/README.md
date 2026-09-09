# www-redirect

Servicio de Cloud Run cuyo único trabajo es mandar al ápice —`https://inspectia.ai`— todo
lo que llegue por un nombre de host retirado. Hoy atiende dos:

| host | por qué |
| --- | --- |
| `www.inspectia.ai` | el nombre alternativo del sitio; ver abajo |
| `oee.inspectia.ai` | subdominio de una app vieja, retirado |

El servicio no sabe de hosts: redirige lo que le llegue, conservando ruta y consulta. Sumar
otro es un CNAME a `ghs.googlehosted.com.` más un mapeo de dominio, sin tocar el código.

## Por qué no lo hace el sitio

Lo hacía, en `resolveCanonicalHost` (`src/lib/http-policy.ts`), y **alcanzaba sólo a las
páginas**. Nitro sirve `public/` y `/assets/` en un middleware global que corre antes del
entry del servidor, así que `www.inspectia.ai/favicon.ico`, `/img/**` y `/assets/**`
respondían 200 en el host equivocado mientras las páginas sí redirigían.

Se probaron las dos vías dentro de la aplicación y ninguna sirve:

- un middleware propio declarado en `handlers` con `middleware: true` **se registra después
  del de estáticos** —comprobado en el build: `globalMiddleware = [static_default, edge]`—,
  así que no ve esos archivos;
- las `routeRules` de Nitro sí corren antes, pero son **ciegas al host**: una regla que
  redirija en `www` redirigiría también en el ápice.

La salida es sacar `www` de la aplicación. El mapeo de dominio apunta a este servicio, que
no sabe servir un archivo, y entonces no queda ningún camino por el que algo salga con ese
nombre de host.

`resolveCanonicalHost` **se deja igual** en el sitio: es la red por si alguna vez el mapeo
vuelve a apuntar acá, y no cuesta nada.

## El caso de oee.inspectia.ai

Un subdominio de una aplicación vieja que quedó **indexado**: Google mostraba
"FactoryOS - OEE Management System" junto a los resultados del sitio, en inglés y de otro
producto. Se borró el CNAME creyendo que con eso salía del índice, y **no sale**: Google
trata un error de DNS como transitorio y conserva la URL esperando que el host vuelva, sin
plazo. Peor todavía, sin DNS ya no hay forma de servirle un `noindex` ni un 410, que es lo
único que desindexa de verdad.

Por eso el CNAME volvió, apuntando acá. Google entra, recibe un 301 al ápice y la baja del
índice. En paralelo se pidió la eliminación temporal en Search Console, que la oculta
mientras tanto.

**La ruta se conserva a propósito, aunque termine en 404.** Mandar todas las URLs viejas de
una aplicación a la home parece más amable, pero Google lee eso como *soft 404* y lo trata
peor que un 404 honesto. Además, de ese subdominio había una sola URL indexada —la raíz—,
que con la ruta conservada va a la raíz del sitio.

## Dónde vive

| | |
| --- | --- |
| Proyecto | `institucional-485213` |
| Región | `us-central1` |
| Servicio | `www-redirect` |
| Imagen | `us-central1-docker.pkg.dev/institucional-485213/cloud-run-source-deploy/www-redirect` (hoy `:v2`) |
| DNS | `www` y `oee`, los dos CNAME → `ghs.googlehosted.com.` |

## Cómo se redespliega

No tiene disparador automático: son veinte líneas que no cambian. A mano, desde esta
carpeta:

```bash
IMG=us-central1-docker.pkg.dev/institucional-485213/cloud-run-source-deploy/www-redirect:v2
docker build -t $IMG .
docker push $IMG
gcloud run deploy www-redirect --image $IMG --project institucional-485213 --region us-central1
```

**`gcloud run deploy --source` no funciona en este proyecto:** la cuenta de servicio por
omisión de Compute no tiene permiso de lectura sobre el bucket de fuentes. Por eso se
construye local y se sube la imagen.

**Ojo con `keepAliveTimeout`:** están puestos a mano en `server.mjs` y no son adorno. Con
los valores por omisión de Node —5 segundos— **una de cada veinte peticiones a `www` moría
con la conexión cortada**, medido en producción: el frontend de Google reusa una conexión
del pozo justo cuando Node la está cerrando por inactividad. Con los plazos por encima de
los del frontend, 40 de 40 limpias. Si alguien los saca, el fallo vuelve y no deja rastro
en ningún registro.

**El acceso público va por `--no-invoker-iam-check`, no por `allUsers`:** una política de
organización bloquea `allUsers` en las asignaciones de IAM. Es la misma configuración que
tiene el servicio del sitio (`invoker-iam-disabled=true`). Si un día el servicio empieza a
devolver 403, es esto.
