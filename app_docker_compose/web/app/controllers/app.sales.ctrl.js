angular.module('app.sales.controllers', [])
    .controller('app.sales.controller', ['$scope', 'api.sales', 'api.products', '$location', function ($scope, sales, products, $location) {
        $scope.sale = {};
        $scope.product = {};
        $scope.busy = {
            list: false,
            form: false
        };
        $scope.list = function () {
            $scope.busy.list = true;
            sales
                .query()
                .then(function (response) {
                    $scope.sales = response.data;
                    $scope.busy.list = false;
                })
        }
        $scope.listProducts = function () {

            products
                .query()
                .then(function (response) {
                    $scope.products = response.data;
                    $scope.calculate();
                    $scope.list();
                })
        }
        $scope.submit = function (form) {
            if (form.$valid) {
                $scope.busy.form = true;
                $scope.sale.productId = parseInt($scope.sale.productId);
                sales
                    .save($scope.sale)
                    .then(function (response) {
                        // $location.path("/");
                        $scope.busy.form = false;
                        $scope.sale = {};
                        $scope.list();
                    })
            }
        }

        $scope.findProdcutById = function (id) {
            if (!$scope.products) return undefined;
            return $scope.products.filter(function (item) {
                return item.id == id;
            })[0];
        }

        $scope.getProdcutDescriptionById = function (id) {
            var product = $scope.findProdcutById(id);
            if (!product) return " - ";
            return product.description;
        }

        $scope.calculate = function () {
            var product = $scope.findProdcutById($scope.sale.productId);
            $scope.sale.total = ((!$scope.sale.quantity ? 0 : $scope.sale.quantity) * (!product ? 0 : product.unitPrice));
        }

        $scope.listProducts();
    }]);