const Sequelize = require('sequelize');
const db = require('../../config/db.config');
const Sale = db.define('Sale', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    productId: {
        type: Sequelize.INTEGER,

    },
    quantity: {
        type: Sequelize.STRING
    },
    total: {
        type: Sequelize.DECIMAL
    }
});
module.exports = Sale;