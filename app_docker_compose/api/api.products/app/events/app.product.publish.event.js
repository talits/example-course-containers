const connector = require('../../config/amqp.config');
const amqp = require('amqp');
const conn = amqp.createConnection(connector.conn);
var exchange;
conn.on('error', function (e) {
    console.log("Erro ao conectar no RabbitMQ: ", e);
});
conn.on('ready', function (data) {
    console.log("Conectado com o RabbitMQ");
    exchange = conn.exchange('product', {
        type: 'fanout'
    });
});
module.exports = {
    created: function (data) {
        console.info("[Evento] Novo evento disparado");
        console.info("Novo produto", data);
        exchange.publish('', {
            "data": data,
            "action": "CREATE"
        }, {})
    },
    updated: function (data) {
        console.info("[Evento] Novo evento disparado");
        console.info("Produto atualizado", data);
        exchange.publish('', {
            "data": data,
            "action": "UPDATE"
        }, {})
    },
    deleted: function (data) {
        console.info("[Evento] Novo evento disparado");
        console.info("Produto removido", data);
        exchange.publish('', {
            "data": data,
            "action": "DELETE"
        }, {})
    }
};