FROM mhart/alpine-node:6 as build
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install --production
RUN rm ./package.json package-lock.json

FROM mhart/alpine-node:slim-6
WORKDIR /app
COPY --from=build ./build .
COPY ./src .

ENTRYPOINT [ "node", "app" ]