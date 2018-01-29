(function () {
    var myclearx = angular.module('myclearx');

    myclearx.controller('ProductController', productController);

    productController.$inject = ['utils', '$scope', '$http', '$ionicPopup', 'httpService', 'url'];
    function productController(utils, $scope, $http, $ionicPopup, httpService, url) {



    };


})();


