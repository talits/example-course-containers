#Arquitetura de Microsserviços.

Código fonte da palestra sobre Arquitetura de Microsserviços, Overview, Implementação e Deploy .

## Pré-configuração e instalação do ambiente.

Node.js -  Tecnologia de servidor utilizada
[Download](https://nodejs.org/en/download/)

RabbitMQ -  Tecnologia utilizada para a troca de mensagens entre serviços 
[Download](https://www.rabbitmq.com/download.html)

Docker
[Download](https://www.docker.com/community-edition)

Visual Studio Code - Opcional
[Download](https://code.visualstudio.com/download)

## Rodando a aplicação

Interface web
./web

> npm install

> node app

API - Produtos
./api/api.products

> npm install

> node app

API - Vendas
./api/api.sales

> npm install

> node app

## Docker compose
> docker-compose up --build



