FROM node:argon

RUN mkdir -p web

WORKDIR /web

COPY package.json /web

RUN npm install

COPY . /web

EXPOSE 4004

CMD [ "node", "app" ]
