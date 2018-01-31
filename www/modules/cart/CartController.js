(function () {
    var myclearx = angular.module('myclearx');
   
    myclearx.controller('CartController',cartController);
    cartController.$inject = ['errorService','$ionicSideMenuDelegate','$ionicHistory','utils', '$scope', '$http', '$ionicPopup', 'httpService', 'url','$state'];
    function cartController(errorService,$ionicSideMenuDelegate,$ionicHistory,utils, $scope, $http, $ionicPopup, httpService, url,$state) {
    
        console.dir($scope.cartItems);
        $scope.removeCartItem=function(index){
            utils.showConfirm().then(function(){

                $scope.cartItems.splice(index,1);
                $scope.$emit("cartToLocal",$scope.cartItems);
            });
            
        }
        $scope.itemcountInc = function (a) {

            a.productCount++;
            if (a.productCount > a.In_stock) {
                $scope.itemcountDesc();
                //alert("in stock "+ $scope.selectedProduct[0].In_stock);
                utils.showAlert("Item quantity is more than stock");
            }else{
                $scope.$emit("cartToLocal",$scope.cartItems);
            }
        }

        $scope.itemcountDesc = function (a) {
            if (a.productCount > 1) {

                a.productCount--;
                $scope.$emit("cartToLocal",$scope.cartItems);
            }
        }

        $scope.Checkout=function(){

            console.dir($scope.cartItems);
        }
    
    
    }


    

})();


