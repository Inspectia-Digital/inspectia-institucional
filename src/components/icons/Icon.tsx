import * as React from "react";
import { type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  GLYPH,
  ICON,
  ICON_SIZE,
  ICON_STROKE,
  type IconConcept,
  type AllowedIcon,
} from "./inspectia-icons";

type Size = keyof typeof ICON_SIZE;

type Props = Omit<LucideProps, "size" | "strokeWidth" | "name"> & {
  /** Concepto del léxico (preferido) o nombre Lucide del set aprobado. */
  name: IconConcept | AllowedIcon;
  size?: Size;
};

/**
 * Único punto de entrada de iconografía en la app.
 * Fija trazo 1.5 y la escala del design system; el color lo hereda por currentColor.
 * No acepta un tamaño arbitrario ni un color propio: eso es intencional.
 */
export function Icon({ name, size = "ui", className, ...rest }: Props) {
  /* Primero el léxico —concepto de negocio— y si no, el glifo aprobado por su nombre.
   *
   * Los dos mapas son estáticos y generados. La segunda búsqueda usaba `icons` de
   * lucide-react, que es el barril completo: por cuatro glifos que caen fuera del léxico
   * —flecha, chevron, pin y menú— entraban 1689 módulos al bundle compartido de todas
   * las páginas. Si esto vuelve a `icons`, vuelve el medio mega. */
  const fromLexicon = (ICON as Record<string, React.ComponentType<LucideProps>>)[name];
  const Glyph = fromLexicon ?? (GLYPH as Record<string, React.ComponentType<LucideProps>>)[name];

  if (!Glyph) {
    if (import.meta.env.DEV) console.warn(`[Icon] "${name}" no está en el set aprobado.`);
    return null;
  }

  return (
    <Glyph
      aria-hidden="true"
      focusable="false"
      width={ICON_SIZE[size]}
      height={ICON_SIZE[size]}
      strokeWidth={ICON_STROKE}
      className={cn("shrink-0", className)}
      {...rest}
    />
  );
}
