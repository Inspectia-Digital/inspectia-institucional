/**
 * Contenedor de las dos páginas legales.
 *
 * Está separado en un componente porque las dos comparten exactamente la misma caja —
 * ancho de lectura, jerarquía de h2/h3 y fecha de última actualización— y porque el
 * texto que va a entrar lo escribe otra persona: cuanto más chica sea la superficie que
 * tiene que tocar, mejor.
 *
 * El ancho es `--read-max` (640px) y no `--content-max`: un párrafo legal a 1200px de
 * ancho no se lee, y estas son las dos páginas del sitio que son puro cuerpo de texto.
 */
export function LegalBody({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-surface px-5 py-[var(--section-pad-md)] md:px-8">
      <div
        className="mx-auto max-w-[var(--read-max)] text-[15px] leading-[var(--leading-normal)] text-ink-secondary
          [&_h2]:mt-12 [&_h2]:text-[21px] [&_h2]:leading-snug [&_h2]:text-ink
          [&_h3]:mt-8 [&_h3]:text-[17px] [&_h3]:font-medium [&_h3]:leading-snug [&_h3]:text-ink
          [&_li]:mt-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5
          [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5"
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Fecha de última actualización.
 *
 * TODO(legales): la fecha es la de la versión firmada del texto, no la del último deploy.
 * Mientras no haya texto no hay fecha, así que la línea dice qué está pasando en vez de
 * mostrar la de hoy, que sería falsa.
 */
export function LegalUpdated({ date }: { date?: string }) {
  return (
    <p className="text-[13px] text-ink-muted">
      {date ? `Última actualización: ${date}` : "Este texto está en redacción."}
    </p>
  );
}
