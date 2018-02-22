(function () {
    var myclearx = angular.module('myclearx');

    myclearx.controller('HomeController', homeController);

    homeController.$inject = ['$rootScope','$ionicScrollDelegate','$ionicNavBarDelegate','$ionicPlatform','utils', '$scope', '$http', '$ionicPopup', 'httpService', 'url'];
    function homeController($rootScope,$ionicScrollDelegate,$ionicNavBarDelegate,$ionicPlatform,utils, $scope, $http, $ionicPopup, httpService, url) {
        //$ionicPlatform.ready(function(){});
        //$ionicNavBarDelegate.showBackButton(false);
        $scope.search="";
        $scope.getProductList = function () {

            httpService.getHttp(url.product, {"Product_order": 1, "Product_type": $scope.categoryId }).then(function (response) {
                console.dir(response);
                $scope.$emit("productData", response);
                $scope.productList = response.data;
            }, function () {

            });
        }

        $scope.loadMoreData=function(){

            console.dir("data adadadadadadad");

            $ionicScrollDelegate.resize();
            //$scope.$broadcast('scroll.infiniteScrollComplete');
            
        }


        $scope.getProductList();
        $scope.$on("getProductList", function () {
            $scope.getProductList();
        });
        $rootScope.getProductListRoot =function (data) {
            $scope.search=data;
             httpService.getHttp(url.product, {search:data,"Product_order": 1, "Product_type": $scope.categoryId }).then(function (response) {
                console.dir(response);
                //$scope.$emit("productData", response);
                $scope.productdataset(response);
                $scope.productList = response.data;
            }, function () {

            });
        };
        
    };


})();


