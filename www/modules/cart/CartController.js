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
                $scope.getTotal();
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
                $scope.getTotal();
            }
        }

        $scope.itemcountDesc = function (a) {
            if (a.productCount > 1) {

                a.productCount--;
                $scope.$emit("cartToLocal",$scope.cartItems);
                $scope.getTotal();
            }
        }

        $scope.Checkout=function(){

            console.dir($scope.cartItems);
        }

         $scope.TotalCount=0;
        $scope.getTotal=function(){
            $scope.TotalCount=0;
            for(var i=0;i<$scope.cartItems.length;i++){
                $scope.TotalCount+=parseFloat($scope.cartItems[i].Price)*parseFloat($scope.cartItems[i].productCount);
            }
        }

        $scope.getTotal();
    
    
    }


    

})();


