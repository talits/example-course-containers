FROM node:10.23

RUN mkdir -p /api.sales

WORKDIR /api.sales

COPY package.json /api.sales

RUN npm install

COPY . /api.sales

EXPOSE 3001

CMD [ "node", "app" ]