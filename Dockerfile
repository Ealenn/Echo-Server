FROM mhart/alpine-node:8 as build
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM mhart/alpine-node:slim-6
WORKDIR /app
COPY ./src/global.json .
COPY --from=build /build/dist/webserver.js .

ENTRYPOINT [ "node", "webserver" ]