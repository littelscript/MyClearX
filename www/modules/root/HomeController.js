(function () {
    var myclearx = angular.module('myclearx');

    myclearx.controller('HomeController', homeController);

    homeController.$inject = ['utils', '$scope', '$http', '$ionicPopup', 'httpService', 'url'];
    function homeController(utils, $scope, $http, $ionicPopup, httpService, url) {

        httpService.getHttp(url.product, { "Product_order": 1 }).then(function (response) {
            console.dir(response);
             $scope.$emit("productData",response);
            $scope.productList = response.data;
        }, function () {

        });


    };


})();


