import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

/**
 * Slider. Su único consumidor es la calculadora de ROI, que es el activo de conversión
 * del sitio y se usa sobre todo desde el teléfono.
 *
 * Dos cambios sobre el primitivo de shadcn, los dos por el dedo y no por el mouse:
 * el pulgar pasa de 16px a 24px —16 es imposible de agarrar en una pantalla táctil, y
 * 24 es el mínimo de WCAG 2.2 para un objetivo—, y la raíz lleva `min-h-11` para que la
 * banda que responde al toque mida 44px en vez de los 6 del riel. Va como alto mínimo y
 * no como relleno: el pulgar está posicionado en absoluto, así que no cuenta para el
 * alto de contenido y un `py` se sumaba sobre los 6px del riel, no sobre los 24.
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center min-h-11", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block size-6 rounded-full border-2 border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
