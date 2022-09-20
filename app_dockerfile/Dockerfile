FROM node:lts-alpine3.16

LABEL APP V2

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT [ "npm", "start" ]