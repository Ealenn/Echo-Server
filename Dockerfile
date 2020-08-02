FROM --platform=$BUILDPLATFORM node:lts-alpine as build
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM --platform=$BUILDPLATFORM node:lts-alpine
WORKDIR /app
COPY ./src/global.json .
COPY --from=build /build/dist/webserver.js .

ENTRYPOINT [ "node", "webserver" ]