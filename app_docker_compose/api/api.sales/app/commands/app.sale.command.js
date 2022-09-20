var poublisher = require("../events/app.sale.publish.event");
const db = require('../../config/db.config');
const Sale = require("../models/app.sale.model");
module.exports = {
    create: function (model, callback) {
        db.transaction().then(function (t) {
            Sale.create({
                productId: model.productId,
                quantity: model.quantity,
                total: model.total
            }, {
                transaction: t
            }).then(function (sale) {
                t.commit();
                poublisher.created(sale.dataValues);
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
    update: function (id, model, callback) {
        db.transaction().then(function (t) {
            Sale.findById(id, {
                transaction: t,
            }).then(sale => {
                sale.update({
                    productId: model.productId,
                    quantity: model.quantity,
                    total: model.total
                }, {
                    transaction: t,
                }).then(function () {
                    t.commit();
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
            }, error => {
                callback({
                    isValid: false,
                    error: 'Prodto não encontrado'
                });
            });


        });

    },
    delete: function (id) {
        db.transaction().then(function (t) {
            Sale.findById(id, {
                transaction: t,
            }).then(sale => {
                sale.destroy({
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

    }
};