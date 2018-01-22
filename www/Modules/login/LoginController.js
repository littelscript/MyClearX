(function () {
    var myclearx = angular.module('myclearx');
   
    myclearx.controller('LoginController',loginController);
    
    loginController.$inject = ['$ionicHistory','$state','errorService','utils', '$scope', '$http', '$ionicPopup', 'httpService', 'url'];
    function loginController($ionicHistory,$state,errorService,utils, $scope, $http, $ionicPopup, httpService, url) {
        $scope.register={};
        $scope.login = {}

        $scope.getLogin = function () {

            httpService.getHttp(url.login, $scope.login).then(function(response){
                  if(response.status){

                    utils.setLocalStorage("userDetails",response.data);
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go("app.home");
                  }else{
                   
                    utils.showAlert(errorService[response.errorCode]);
                  }
 
            },function(){

                utils.showAlert(errorService['default']);
            });

        };
        $scope.getRegister=function(data){
            httpService.getHttp(url.signup,data).then(function (response) {
                if(response.status){

                    utils.setLocalStorage("userDetails",response.data);
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go("app.home");
                 }else{
               
                    utils.showAlert(errorService[response.errorCode]);
                  }
 
                
            }, function () {
                utils.showAlert(errorService['default']);
            });



        };


    };

})();


