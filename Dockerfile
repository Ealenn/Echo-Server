FROM --platform=$BUILDPLATFORM node:lts-alpine3.9 AS build
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine3.9
WORKDIR /app
COPY --from=build /build/src/global.json .
COPY --from=build /build/dist/webserver.js .

ENTRYPOINT [ "node", "webserver" ]