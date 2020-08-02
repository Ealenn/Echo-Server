FROM --platform=$BUILDPLATFORM node:lts-alpine as public
FROM --platform=$BUILDPLATFORM node:lts-alpine AS build
ARG TARGETPLATFORM
ARG BUILDPLATFORM
RUN echo $BUILDPLATFORM - $TARGETPLATFORM
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM public
ARG TARGETPLATFORM
ARG BUILDPLATFORM
RUN echo $BUILDPLATFORM - $TARGETPLATFORM
WORKDIR /app
COPY --from=build /build/src/global.json .
COPY --from=build /build/dist/webserver.js .

ENTRYPOINT [ "node", "webserver.js" ]