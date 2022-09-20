angular.module('app.home.controllers', [])
    .controller('app.home.controller', ['$scope', 'api.products', function ($scope, api) {
        $scope.product = {};
        $scope.busy = {
            list: false,
            form: false
        };
        $scope.list = function () {
            $scope.busy.list = true;
            api
                .query()
                .then(function (response) {
                    $scope.products = response.data;
                    $scope.busy.list = false;
                })
        }
        $scope.submit = function (form) {
            if (form.$valid) {
                $scope.busy.form = true;
                api
                    .save($scope.product)
                    .then(function (response) {
                        $scope.products = response.data;
                        $scope.busy.form = false;
                        $scope.product = {};
                        $scope.list();
                    })
            }
        }

        $scope.validateStock = function (product) {
            if (product.quantity > product.minimumQuantity)
                return 'Saldável';
            else if (product.quantity == product.minimumQuantity)
                return 'Ideal';
            else
                return 'Baixo'
        }

        $scope.list();
    }]);