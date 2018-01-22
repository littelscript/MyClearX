(function () {
    var myclearx = angular.module('myclearx');
   
    myclearx.controller('AddProductController',addProductController);
    addProductController.$inject = ['$ionicHistory','$state','errorService','utils', '$scope','$ionicPopup', 'httpService', 'url'];
    function addProductController($ionicHistory,$state,errorService,utils, $scope, $ionicPopup, httpService, url) {
      $scope.ProductData={};

      $scope.addProduct=function(data){
        data.User_id=1;
        data.Expiry_date=utils.formatDate(data.Expiry_date_m);
        console.dir(data);
        httpService.getHttp(url.addProduct,data)
        .then(function(data){
             console.dir(data);
        },function(){

        });
    }

    }

})();


