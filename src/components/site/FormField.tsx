/**
 * Los dos primitivos de formulario del sitio.
 *
 * Vivían dentro de `roi/LeadForm.tsx`, que era el único formulario que quedaba. Con el de
 * cotización del marketplace pasaron a ser dos, y copiar el campo habría repetido la
 * decisión de accesibilidad —la etiqueta arriba y no como `placeholder`— en un lugar donde
 * la próxima persona no la ve.
 */

/**
 * Sin `placeholder` haciendo de etiqueta: al escribir desaparece y el campo queda sin
 * nombre, así que quien vuelve a revisar el formulario ya no sabe qué puso dónde.
 */
export const INPUT =
  "h-[52px] w-full rounded-[var(--radius-md)] border border-line-strong bg-surface px-3.5 text-[15px] text-ink outline-none focus:border-line-brand";

/** El mismo control, en alto de área de texto. */
export const TEXTAREA =
  "min-h-[104px] w-full resize-y rounded-[var(--radius-md)] border border-line-strong bg-surface px-3.5 py-3 text-[15px] leading-[var(--leading-normal)] text-ink outline-none focus:border-line-brand";

/**
 * Etiqueta arriba, control, y el error debajo.
 *
 * Va como `<label>` envolviendo al control y no con `htmlFor`: así no hace falta inventar
 * un `id` único por campo, y el clic en el texto enfoca igual.
 */
export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[13px] font-medium text-ink-secondary">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-[13px] text-[var(--status-stop)]">{error}</span>}
    </label>
  );
}
