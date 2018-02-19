(function () {
    var myclearx = angular.module('myclearx');
   
    myclearx.controller('LoginController',loginController);
    
    loginController.$inject = ['$rootScope','$ionicPopup','$ionicHistory','$state','errorService','utils', '$scope', '$http', '$ionicPopup', 'httpService', 'url'];
    function loginController($rootScope,$ionicPopup,$ionicHistory,$state,errorService,utils, $scope, $http, $ionicPopup, httpService, url) {
        $scope.register={};
        $scope.login = {}
        $scope.registerBtn=false;
       $scope.getLogin = function () {

            httpService.getHttp(url.login, $scope.login).then(function(response){
                  if(response.status){

                    utils.setLocalStorage("userDetails",response.data);
                    $scope.$emit("loginSuccess");
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
                    $scope.$emit("loginSuccess");
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
        var otp="";
        $scope.getOTP=function(data){
            otp="";
            httpService.getHttp(url.otpsinup,data).then(function (response) {
                if(response.status){
    
                    $scope.showPopup(); 
                    otp=response.code;
                 }else{
               
                    utils.showAlert(errorService[response.errorCode]);
                  }
    
                
            }, function () {
                utils.showAlert(errorService['default']);
            });
    
    
    
        }
    
        $scope.showPopup = function() {
            $scope.data={};
            $scope.errorOtp=false;
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
              template: '<span ng-show="errorOtp">Invalid OTp</span><input type="number" minlength="6" maxlength="6" ng-model="data.otp" max="6" min="6" required> ',
              title: 'Enter OTP',
              subTitle: 'Please use normal things',
              scope: $scope,
              buttons: [
                { text: 'Cancel' },
                {
                  text: '<b>Save</b>',
                  type: 'button-assertive',
                  onTap: function(e) {
                     
                      $scope.errorOtp=false;
                     if(otp==this.element[0].children[0].children[1].children[1].value){
                      myPopup.close();
                     }else{
                      $scope.errorOtp=true;
                      e.preventDefault();
                    }

        
                  }
                }
              ]
            });
          
            myPopup.then(function(res) {
                $scope.getRegister($scope.register);
            });
          
            /*$timeout(function() {
               myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);*/
           };


    };



    

})();


