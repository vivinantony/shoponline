var app = angular.module('app', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('products', {
            url: "/",
            templateUrl: "view/products.html",
            controller: "ProductsCtrl"
        })
        .state('view', {
            url: "/view/:id",
            templateUrl: "view/view.html",
            controller: "ViewCtrl"
        })
});

app.controller('AppCtrl', function($scope) {
    $scope.cart = 0;
});

app.controller('ProductsCtrl', function($scope, $http, $state) {
    $http.get('../json/data.json').then(function(res) {
        $scope.products = res.data;
    });

    $scope.viewProduct = function(el) {
        $state.go('view', {id: el})
    };

    $scope.limit= 4;
    $scope.loadMore = function() {
        $scope.limit = $scope.limit + 4;
    };
});

app.controller('ViewCtrl', function($scope, $http, $stateParams) {
    $http.get('../json/data.json').then(function(res) {
        $scope.products = res.data;
        angular.forEach($scope.products, function(data) {
            if($stateParams.id == data.id) {
                $scope.product = data;
            }
        });
    });
});