FROM node:16-slim as base
FROM base as builder

RUN apt-get update \
    && buildDeps="python3 build-essential" \
    && apt-get install -y --no-install-recommends $buildDeps \
    && rm -rf /var/lib/apt/lists/*

COPY . /build/
RUN chown -R node:node build

USER node
WORKDIR /build
RUN yarn install \
    && yarn build

FROM base

LABEL maintainer="Plone Foundation <conf@plone.org>" \
      org.label-schema.name="ploneconf-frontend" \
      org.label-schema.description="Plone Conference 2022 frontend." \
      org.label-schema.vendor="Plone Foundation" \
      org.label-schema.docker.cmd="docker run -d -p 3000:3000 plone/ploneconf-frontend:latest"

RUN apt-get update \
    && buildDeps="busybox" \
    && apt-get install -y --no-install-recommends $buildDeps \
    && busybox --install -s \
    && rm -rf /var/lib/apt/lists/*

USER node
COPY --from=builder /build/ /app/

WORKDIR /app
EXPOSE 3000
CMD ["yarn", "start:prod"]
