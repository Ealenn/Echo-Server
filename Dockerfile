FROM --platform=$BUILDPLATFORM node:lts-alpine AS build
ARG TARGETPLATFORM
ARG BUILDPLATFORM
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM --platform=$BUILDPLATFORM node:lts-alpine
ARG TARGETPLATFORM
ARG BUILDPLATFORM
WORKDIR /app
COPY --from=build /build/src/global.json .
COPY --from=build /build/dist/webserver.js .

ENTRYPOINT [ "node", "webserver.js" ]