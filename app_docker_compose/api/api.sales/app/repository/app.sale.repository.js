const Product = require("../models/app.sale.model");
module.exports = {
    all: function () {
      if (typeof callback === 'function') {
        Product.all().then(products => {
            callback(products);
        }, error => {
            callback({
                error: error
            });
        });
      }
    },
    get: function (id) {
        if (typeof callback === 'function') {
            Product.findById(id).then(product => {
                callback(product);
            })
        } 
    }
}