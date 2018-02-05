(function () {
    var myclearx = angular.module('myclearx');
   
    myclearx.controller('AddProductController',addProductController);
    addProductController.$inject = ['imageUploadService','$ionicHistory','$state','errorService','utils', '$scope','$ionicPopup', 'httpService', 'url'];
    function addProductController(imageUploadService,$ionicHistory,$state,errorService,utils, $scope, $ionicPopup, httpService, url) {
      $scope.ProductData={};
      $scope.imagePath=[];
      var userDetails=null;
        if(utils.getLocalStorage("userDetails")){
            userDetails = utils.getLocalStorage("userDetails");
            
        }
        $scope.addProduct=function(data){
            data.User_id=userDetails.Tab_id;
            
            data.Expiry_date=utils.formatDate(data.Expiry_date_m);
            console.dir(data);
            imageUploadService.uploadImageFile($scope.imagePath,data);
            /*
            httpService.getHttp(url.addProduct,data)
            .then(function(data){
                console.dir(data);
            },function(){

            });*/
        }
        $scope.getFile=function(){
            if($scope.imagePath.length<4){
                imageUploadService.getActionSheet().then(function(type){
                    
                    if(type!=null){
                        imageUploadService.selectPicture(type).then(function(imagePath){
                            imageUploadService.fileUploadSetUp(imagePath).then(function(imagePath){
                                $scope.imagePath.push(imagePath);
                            },function(){});
                            

                        });
                    }

                });
            }else{
                utils.showAlert(errorService['602']);
            }
            
        }

        $scope.imageSelect = ['0', '0', '0', '0'];
        $scope.imageSelectIndex=[];
        $scope.selectImageContainer = function (a) {
            if ($scope.imageSelect[a] == 1) {
                $scope.imageSelect[a] = 0;
                $scope.imageSelectIndex.splice(a,1);   
            }
            else {
                $scope.imageSelect[a] = 1;
                if($scope.imageSelectIndex.indexOf(a)==-1){
                    $scope.imageSelectIndex.push(a);
                }
            }
            

        }
        $scope.removeImage=function(){
            for(var i=0;i<$scope.imageSelectIndex.length;i++){
                $scope.imagePath.splice($scope.imageSelectIndex[i],1);       
                $scope.imageSelect[$scope.imageSelectIndex[i]] = 0;
            }
            
                  
        }

    }

   

})();


