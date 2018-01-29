(function () {
    var myclearx = angular.module('myclearx');

    myclearx.controller('ProfileController', profileController);

    profileController.$inject = ['$ionicHistory', '$state', 'errorService', 'utils', '$scope', '$http', '$ionicPopup', 'httpService', 'url'];
    
    function profileController($ionicHistory, $state, errorService, utils, $scope, $http, $ionicPopup, httpService, url) {
        
        $scope.register = {};
        var userDetails=null;
        if(utils.getLocalStorage("userDetails")){
            userDetails = utils.getLocalStorage("userDetails");
            
        }
        $scope.register = userDetails;
        $scope.register.Mobile_no = parseInt(userDetails.Mobile_no);
        $scope.register.Pincode =parseInt(userDetails.Pincode);

        $scope.updateProfile=function(data){
            httpService.getHttp(url.updateProfile,data)
            .then(function(response){
               console.dir(response);
               if(response.status){
                 $scope.userDetails=  response.data;
                 utils.setLocalStorage("userDetails",response.data);
               }
               utils.showAlert(errorService[response.errorCode]);

            },function(){
               utils.showAlert(errorService['default']);
            });

        }


    };

})();


