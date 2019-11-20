FROM node:12-alpine

COPY . .

RUN npm install
ENTRYPOINT [ "node", "./src/app" ]