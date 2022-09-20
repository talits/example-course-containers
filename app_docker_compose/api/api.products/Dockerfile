FROM node:10.23

RUN mkdir -p /api.products

WORKDIR /api.products

COPY package.json /api.products

RUN npm install

COPY . /api.products

EXPOSE 3000

CMD [ "node", "app" ]