(function () {
    var myclearx = angular.module('myclearx')

    myclearx.directive('cartButton', CartButton);
    CartButton.$inject = ['$ionicScrollDelegate','$ionicSideMenuDelegate', '$ionicHistory', 'utils', '$http', '$ionicPopup', 'httpService', 'url', '$state'];
    function CartButton($ionicScrollDelegate,$ionicSideMenuDelegate, $ionicHistory, utils,$http, $ionicPopup, httpService, url, $state) {
        
        var directive={};
        //directive.scope=true;
        directive.scope={
            data:"="
        }
        //directive.template ='<a class="button button-icon button-clear" href="#/app/cart" menu-close><i class="ion-ios-cart icon"></i></a><ion-badge ng-if="status">{{count}}</ion-badge>'; 
        directive.template='<button class="button button-icon button-clear ion-ios-cart"  ui-sref="app.cart" menu-close ><span class="cart-item-ind" ng-if="status">{{count}}</span></button>';
        directive.controller=function($scope){
            $scope.count=$scope.data;    
        }
        directive.link= function link($scope, element, attrs) {
            $scope.status=false;
            if($scope.data>0){
                $scope.status=true;
                $scope.count=$scope.data;
            }
            $scope.$on('cartCount', function(e,data) {
                $scope.status=false;
                if(data>0){
                    $scope.status=true;
                    $scope.count=data;
                }
            });
           
        }
        return directive;


    };
})();


