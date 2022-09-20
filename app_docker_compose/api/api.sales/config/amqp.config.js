const conn = {
    host: process.env.RMQ_HOST || 'localhost' || '192.168.99.100',
    port: 5672,
    login: 'guest',
    password: 'guest',
    ssl: {
        enabled: false
    }
};
const options = {
    defaultExchangeName: 'events',
    reconnect: true,
    reconnectBackoffStrategy: 'linear',
    reconnectExponentialLimit: 120000,
    reconnectBackoffTime: 1000
};
exports.conn = conn;
exports.options = options;
