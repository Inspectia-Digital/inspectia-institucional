# Hotspots parpadeantes en la imagen del hero

Sí, con la imagen actual puedo ubicarlos. Te propongo posiciones iniciales estimadas leyendo el render isométrico de la fábrica, y luego ajustamos a pixel-perfecto cuando los veas en pantalla (es lo más eficiente: 2 minutos de iteración vs. pedirte coordenadas exactas ahora).

## Qué se construye

Un nuevo componente `<Hotspot>` posicionado absolutamente sobre la imagen del hero (`src/components/site/Hero.tsx`), con:

- Punto central sólido cyan `#17ccd3` (8 px).
- Anillo exterior con `animate-ping` (efecto radar/pulso neón).
- Glow suave con `box-shadow` cyan para reforzar el neón sobre la imagen clara.
- Tooltip opcional con label al hacer hover (ej. "Recepción", "Línea de producción", etc.).

## Ubicaciones propuestas (en % sobre la imagen)

Lectura de la imagen adjunta:

1. **Recepción de mercadería** (interior, junto a los portones del frente del edificio) → `left: 38%, top: 60%`
2. **Línea de producción · punto A** (mezcladores/tanques, zona superior) → `left: 47%, top: 32%`
3. **Línea de producción · punto B** (cinta transportadora central) → `left: 52%, top: 52%`
4. **Estanterías · punto A** (racks altos, fondo) → `left: 66%, top: 28%`
5. **Estanterías · punto B** (racks, lateral derecho) → `left: 76%, top: 38%`
6. **Armado y despacho** (zona derecha con cajas/embalaje) → `left: 82%, top: 50%`

Nota: pediste 5 puntos pero detallaste 6 zonas (1 recepción + 2 producción + 2 estanterías + 1 despacho = 6). **Voy a colocar las 6** salvo que prefieras eliminar una; lo más natural a recortar sería un punto de estanterías para dejar (1+2+1+1) = 5.

## Detalles técnicos

```tsx
// Hotspot.tsx
<div className="absolute -translate-x-1/2 -translate-y-1/2 group"
     style={{ left: '38%', top: '60%' }}>
  <span className="absolute inset-0 rounded-full bg-[#17ccd3] opacity-60 animate-ping" />
  <span className="relative block h-3 w-3 rounded-full bg-[#17ccd3]
                   shadow-[0_0_12px_#17ccd3,0_0_24px_rgba(23,204,211,0.6)]" />
  <span className="opacity-0 group-hover:opacity-100 transition ...">Recepción</span>
</div>
```

Se monta dentro del contenedor `relative aspect-[16/9]` que ya envuelve al `<img>` del hero, así escalan junto a la imagen en todos los breakpoints.

## Iteración

Después de implementar, te muestro el resultado y ajustamos posiciones específicas si alguna queda corrida (es habitual con renders isométricos).

## Decisión rápida

¿Querés que coloque **6 puntos** (todas las zonas que mencionaste) o **5 puntos** quitando uno de los racks de estantería?
