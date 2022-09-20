const Sequelize = require('sequelize');
const sequelize = new Sequelize('', '', '', {
    dialect: 'sqlite',
    storage: './config/microservices.db'
});
module.exports = sequelize;