angular.module('app', [
        'app.home.controllers',
        'app.sales.controllers',
        'app.services',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "app/views/home.html",
                controller: "app.home.controller"
            })
            .when("/sales", {
                templateUrl: "app/views/sales.html",
                controller: "app.sales.controller"
            });
    });