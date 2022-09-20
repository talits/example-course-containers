const connector = require('../../config/amqp.config');
const amqp = require('amqp');
const conn = amqp.createConnection(connector.conn);

module.exports = {
    subscribe: function () {
        conn.on('error', function (e) {
            console.log("Erro ao se conectar com o RabbitMQ ", e);
        });
        conn.on('ready', function () {
            console.log('Conectado com o RabbitMQ');
            conn.exchange("product", options = {
                type: 'fanout'
            }, function (exchange) {
                console.log('Inscrito no product exchange');
                conn.queue("product.event.queue", function (queue) {
                    queue.bind(exchange, '');
                    queue.subscribe(function (message) {
                        console.log("Novo evento recebido");
                        console.info('Recebendo evento de produto', message);
                    });
                });

            });
        });
    }
}