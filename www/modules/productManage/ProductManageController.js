(function () {
    var myclearx = angular.module('myclearx');

    myclearx.controller('ProductManageController', productManageController);
    productManageController.$inject = ['$ionicScrollDelegate','errorService','$ionicSideMenuDelegate', '$ionicHistory', 'utils', '$scope', '$ionicPopup', 'httpService', 'url', '$state'];
    function productManageController($ionicScrollDelegate,errorService,$ionicSideMenuDelegate, $ionicHistory, utils, $scope, $ionicPopup, httpService, url, $state) {
        $scope.productListData=[];
        var userDetails=null;
        if(utils.getLocalStorage("userDetails")){
            userDetails = utils.getLocalStorage("userDetails");
            
        }
        $scope.getProductById = function () {

            httpService.getHttp(url.getProductById, { 'User_id': userDetails.Tab_id })
                .then(function (data) {
                    $scope.productListData = data.data;
                }, function () {

                });

        }
        $scope.ProductData={};
        $scope.editViewFun=function(data){

            if(data){
                data.Price=parseInt(data.Price);
                data.Expiry_date_m=new Date(data.Expiry_date);
                $scope.ProductData=data;
            }
            $ionicScrollDelegate.resize();
            $scope.editView=!$scope.editView;
        }
        $scope.updateProduct=function(data){
            data.User_id=1;
            data.Expiry_date=utils.formatDate(data.Expiry_date_m);
            data.Price=parseInt(data.Price);
            console.dir(data);
            httpService.getHttp(url.updateProduct,data)
            .then(function(reponse){
                console.dir(reponse);
                utils.showAlert(errorService[reponse.errorCode]);
               
            },function(){

            });
        }

        $scope.deleteProductById = function (data,index) {
            
            httpService.getHttp(url.deleteProduct, { 'Tab_id': data.Tab_id })
            .then(function (reponse) {
               
                if(reponse.status){

                    $scope.productListData.splice(index,1); 
                    utils.showAlert(errorService[reponse.errorCode]);
                }else{
                    utils.showAlert(errorService['default']);
                }
            }, function () {

            });

        }

        // Pop up
        $scope.showPopup = function (data,index) {
            
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                // template: '<input type="password" ng-model="data.wifi">',
                title: 'Confirm an action',
                subTitle: 'Do you really want to delete?',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Delete</b>',
                        type: 'button-assertive',
                        onTap: function (e) {
                        

                            
                            myPopup.close();
                            $scope.deleteProductById(data,index);
                            

                            
                        }
                    }
                ]
            });

            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });


        };

        $scope.imageSel = ['0', '0', '0', '0'];
        $scope.selectImageContainer = function (a) {
            if ($scope.imageSel[a] == 1) {
                $scope.imageSel[a] = 0;
            }
            else {
                $scope.imageSel[a] = 1;
            }

        }

        $scope.getProductById();
    }
})();


