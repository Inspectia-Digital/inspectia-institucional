# Imagen del redirector de www.
#
# Sin etapa de build y sin dependencias: es un único archivo que usa nada más que el
# módulo http de Node. Alpine y no slim —que es lo que usa el sitio— porque acá el arranque
# en frío sí se nota: el servicio escala a cero y `www` recibe poco tráfico, así que
# prácticamente cada visita paga el arranque. La imagen queda en unos 50 MB en vez de 200.

# syntax=docker/dockerfile:1
FROM node:24-alpine

WORKDIR /app

# Cloud Run inyecta PORT —8080— y espera que el proceso escuche ahí.
ENV NODE_ENV=production \
    PORT=8080

COPY --chown=node:node server.mjs ./

USER node

EXPOSE 8080

# Sin npm de por medio: `node` queda como PID 1 y recibe el SIGTERM que Cloud Run manda al
# apagar la instancia.
CMD ["node", "server.mjs"]
