(function () {
    var myclearx = angular.module('myclearx');
   
    myclearx.controller('AddProductController',addProductController);
    addProductController.$inject = ['imageUploadService','$ionicHistory','$state','errorService','utils', '$scope','$ionicPopup', 'httpService', 'url'];
    function addProductController(imageUploadService,$ionicHistory,$state,errorService,utils, $scope, $ionicPopup, httpService, url) {
      $scope.ProductData={};
      $scope.imagePath=[];
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
        $scope.getFile=function(){
            if($scope.imagePath.length<4){
                imageUploadService.getActionSheet().then(function(type){
                    
                    if(type!=null){
                        imageUploadService.selectPicture(type).then(function(imagePath){

                            $scope.imagePath.push(imagePath);
                             var reader = new FileReader();
    /*reader.onload = function(){
      var dataURL = reader.result;
      var output = document.getElementById('output');
      output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);*/

                        });
                    }

                });
            }else{
                utils.showAlert(errorService['602']);
            }
            
        }

    }

})();


