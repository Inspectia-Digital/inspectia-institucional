# Imagen para Cloud Run.
#
# El repo se construye desde dos lados y no producen lo mismo: Lovable despliega a
# Cloudflare Workers, que es el destino por omisión, y esto arma un servidor Node. Lo que
# los separa es NITRO_PRESET, que se setea acá abajo y en ningún otro lado; sin la
# variable, el build sale igual que siempre.
#
# Dos etapas: la primera compila con todas las dependencias, la segunda se queda sólo con
# la salida. `.output` es autocontenido —lleva sus propias dependencias trazadas y pesa
# unos 5 MB—, así que la imagen final no necesita node_modules ni el código fuente.

# syntax=docker/dockerfile:1

# ---------- Etapa de build ----------
FROM node:24-slim AS build

WORKDIR /app

# ⚠️ Vite **congela** las VITE_* en el momento de compilar, no al arrancar el contenedor.
# Una variable cargada después en Cloud Run no hace absolutamente nada: el valor ya está
# escrito dentro del JavaScript servido. Por eso van como ARG y no como variable de
# entorno del servicio.
#
# Llevan valor por omisión a propósito. Ninguna de las dos es un secreto —las dos terminan
# a la vista en el HTML— y así el camino de un clic de Cloud Run, que conecta el repo y
# construye sin pasar argumentos, sale bien configurado igual. Para pisarlas:
#   docker build --build-arg VITE_GTM_ID=GTM-XXXXXXX .
ARG VITE_SITE_URL=https://inspectia.ai
ARG VITE_GTM_ID=GTM-M7KDBXZX

ENV VITE_SITE_URL=$VITE_SITE_URL \
    VITE_GTM_ID=$VITE_GTM_ID \
    NITRO_PRESET=node-server

# El lockfile antes que el código: mientras no cambien las dependencias, esta capa se
# reusa y el build se salta la instalación entera.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# `prebuild` genera sitemap.xml y robots.txt a partir de src/content, así que las páginas
# nuevas entran solas al mapa del sitio. No hace falta acordarse de nada.
RUN npm run build

# ---------- Imagen final ----------
FROM node:24-slim AS runtime

WORKDIR /app

# Cloud Run inyecta PORT —8080— y espera que el proceso escuche ahí. HOST va explícito:
# atado a localhost, el contenedor arranca bien y no contesta una sola petición, que es de
# los errores más difíciles de diagnosticar porque no falla, simplemente no responde.
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=8080

COPY --from=build --chown=node:node /app/.output ./.output

# Sin root. No hace falta para servir y es lo que Cloud Run espera.
USER node

EXPOSE 8080

# Sin npm de por medio: `node` queda como PID 1 y recibe el SIGTERM que Cloud Run manda
# al apagar la instancia. Con `npm start` la señal muere en el proceso de npm y los
# apagados quedan sucios.
CMD ["node", ".output/server/index.mjs"]
