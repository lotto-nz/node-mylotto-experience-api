FROM node:10.18.1-stretch as build

ARG DEBIAN_FRONTEND=noninteractive

RUN mkdir -p /usr/local/mylotto/router
WORKDIR /usr/local/mylotto/router

COPY src/ ./
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN npm install \
    && npm run build \
    && npm prune --only=production \
    && npm dedupe


FROM node:10.18.1-stretch as target
ENV SERVICE_USER=node

ENV TZ=Pacific/Auckland
RUN echo $TZ > /etc/timezone && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime

RUN mkdir /usr/local/etc/router \
    && chown $SERVICE_USER /usr/local/etc/router

COPY --from=build --chown=node:node /usr/local/mylotto/router/package.json /usr/local/mylotto/router/package.json
COPY --from=build --chown=node:node /usr/local/mylotto/router/dist /usr/local/mylotto/router
COPY --from=build --chown=node:node /usr/local/mylotto/router/node_modules /usr/local/mylotto/router/node_modules
COPY docker/context/usr/local/bin/entrypoint.sh /usr/local/bin/entrypoint.sh

WORKDIR /usr/local/mylotto/router
USER $SERVICE_USER

# Container pilot obligatory parameters START
ENV SERVICE_NAME=router
ENV SERVICE_PRE_EXEC=/bin/true
ENV SERVICE_HEALTHCHECK_EXEC="/usr/local/bin/healthcheck http://localhost:8080/api/internal/heartbeat"
HEALTHCHECK CMD /usr/local/bin/healthcheck http://localhost:8080/api/internal/heartbeat
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
# Container pilot obligatory parameters END
