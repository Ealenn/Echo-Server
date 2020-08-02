FROM --platform=$BUILDPLATFORM node:lts-alpine as build
WORKDIR /build
RUN apk update && apk add dos2unix
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
RUN dos2unix ./src/global.json
RUN dos2unix /build/dist/webserver.js

FROM --platform=$BUILDPLATFORM node:lts-alpine
WORKDIR /app
COPY --from=build /build/src/global.json .
COPY --from=build /build/dist/webserver.js .

ENTRYPOINT [ "node", "webserver" ]