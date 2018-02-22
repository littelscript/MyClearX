(function () {
    var myclearx = angular.module('myclearx');
   

    myclearx.controller('SearchController', function ($scope,$rootScope) {

                 $scope.search="";

        $scope.getSearch=function(search){

            $rootScope.getProductListRoot(search);
        }         

    });


})();


