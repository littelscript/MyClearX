(function () {
    var myclearx = angular.module('myclearx');

    myclearx.controller('ProductController', productController);

    productController.$inject = ['$cordovaToast','$cordovaVibration','utils', '$scope', '$http', '$ionicPopup', 'httpService', 'url'];
    function productController($cordovaToast,$cordovaVibration,utils, $scope, $http, $ionicPopup, httpService, url) {
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
                if($scope.checkCartProduct(data)){
                    data.productCount = $scope.count;
                    $scope.cartItems.push(data);
                    console.dir($scope.cartItems);
                    $scope.$emit("cartToLocal", $scope.cartItems);
                    $scope.$broadcast("show",$scope.cartItems.length);
                    $cordovaToast.showShortCenter('Item added in cart');
                    navigator.vibrate(500);
                        
                }else{
                    utils.showAlert("Item is already in cart.");
                    navigator.vibrate(500);
                }
            }
        }

        $scope.checkCartProduct = function (newItem) {

            for (var i = 0; i < $scope.cartItems.length; i++) {

                if (newItem.Tab_id == $scope.cartItems[i].Tab_id) {

                    return false;
                }
            }
            return true;


        }
        console.dir($scope.productList);

    };


})();


