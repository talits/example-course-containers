const Sequelize = require('sequelize');
const db = require('../../config/db.config');
const Product = db.define('Product', {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    code: {
        type: Sequelize.STRING,

    },
    description: {
        type: Sequelize.STRING
    },
    unitPrice: {
        type: Sequelize.DECIMAL
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    minimumQuantity: {
        type: Sequelize.INTEGER
    },
});
module.exports = Product;