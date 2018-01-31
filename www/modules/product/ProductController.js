(function () {
    var myclearx = angular.module('myclearx');

    myclearx.controller('ProductController', productController);

    productController.$inject = ['utils', '$scope', '$http', '$ionicPopup', 'httpService', 'url'];
    function productController(utils, $scope, $http, $ionicPopup, httpService, url) {
        $scope.count = 1;
        $scope.itemcountInc = function () {

            $scope.count++;
            if ($scope.count > $scope.productList[$scope.selectedProd].In_stock) {
                $scope.itemcountDesc();
                //alert("in stock "+ $scope.selectedProduct[0].In_stock);
                utils.showAlert("Item quantity is more than stock");
            }
        }

        $scope.itemcountDesc = function () {
            if ($scope.count > 1) {

                $scope.count--;
            }
        }

        $scope.addToCart = function (data) {
            if ($scope.count > 0) {

                data.productCount = $scope.count;
                $scope.cartItems.push(data);
                console.dir($scope.cartItems);

                $scope.$emit("cartToLocal", $scope.cartItems);
            }
        }
        console.dir($scope.productList);

    };


})();


