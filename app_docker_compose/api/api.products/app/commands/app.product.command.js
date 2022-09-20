var poublisher = require("../events/app.product.publish.event");
const db = require('../../config/db.config');
const Product = require("../models/app.product.model");

module.exports = {

    create: function (model, callback) {
        db.transaction().then(function (t) {
            Product.create({
                code: model.code,
                description: model.description,
                unitPrice: model.unitPrice,
                quantity: model.quantity
            }, {
                transaction: t
            }).then(function (product) {
                t.commit();
                poublisher.created(product.dataValues);
                callback({
                    isValid: true
                });
            }).catch(function (error) {
                t.rollback();
                callback({
                    isValid: false,
                    error: error
                });
            });
        });
    },
    update: function (id, model) {
        db.transaction().then(function (t) {
            Product.findById(id, {
                transaction: t,
            }).then(product => {
                product.update({
                    code: model.code,
                    description: model.description,
                    unitPrice: model.unitPrice,
                    quantity: model.quantity
                }, {
                    transaction: t,
                }).then(function () {
                    t.commit();
                    if (typeof callback === 'function') {
                        callback({
                            isValid: true
                        });
                    }
                }).catch(function (error) {
                    t.rollback();
                    callback({
                        isValid: false,
                        error: error
                    });
                });
            }, error => {
                callback({
                    isValid: false,
                    error: 'Prodto não encontrado'
                });
            });


        });

    },

    delete: function (id, ) {
        db.transaction().then(function (t) {
            Product.findById(id, {
                transaction: t,
            }).then(product => {
                product.destroy({
                    transaction: t,
                }).then(function () {
                    t.commit();
                    if (typeof callback === 'function') {
                    callback({
                        isValid: true
                    });}
                }).catch(function (error) {
                    t.rollback();
                    callback({
                        isValid: false,
                        error: error
                    });
                });
            }, error => {
                callback({
                    isValid: false,
                    error: 'Prodto não encontrado'
                });
            });

        });

    },

    updateStockByEvent: function (data) {
        db.transaction().then(function (t) {
            Product.findById(data.productId, {
                transaction: t,
            }).then(product => {
                console.info('Produto antes da alteração', product.dataValues);
                product.update({
                    quantity: (product.dataValues.quantity - data.quantity)
                }, {
                    transaction: t,
                }).then(function () {
                    t.commit();
                }).catch(function (error) {
                    t.rollback();
                });
            }, error => {});
        });

    }
};