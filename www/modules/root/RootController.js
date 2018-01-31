(function () {
    var myclearx = angular.module('myclearx')

    myclearx.controller('RootController', rootContoller);
    rootContoller.$inject = ['$ionicSideMenuDelegate','$ionicHistory','utils', '$scope', '$http', '$ionicPopup', 'httpService', 'url','$state'];
    function rootContoller($ionicSideMenuDelegate,$ionicHistory,utils, $scope, $http, $ionicPopup, httpService, url,$state) {
        $scope.categorylist = [{"name":"All","key":0},{"name":"Pesticides","key":1},{"name":"Insecticides","key":2},{"name":"Fertilisers","key":3},{"name":"Seeds","key":4}];
        $scope.packSize = ['Grams', 'Kgrams', 'tonn', 'mLiters', 'Liters']
        $scope.productList = [];
        $scope.cartItems=[];
        $scope.categoryId=0;
        if(utils.getLocalStorage("cartItems")){

            $scope.cartItems = utils.getLocalStorage("cartItems"); 
        }
        $scope.loginStatus=false;
        if(utils.getLocalStorage("userDetails")){
            $scope.loginStatus=true;     
        }
        $scope.$on("loginSuccess",function(){
            $scope.loginStatus=true; 
        });

        $scope.$on("productData",function(e,response){
            $scope.productList = response.data;
        });

        $scope.$on("cartToLocal",function(e,cartData){
            utils.setLocalStorage("cartItems",cartData);
        });

        
        
        

        $scope.loginRegister = "Login";
        $scope.editView = 0;
        $scope.products = [1, 2, 3, 4, 5, 6, 7, 8];
        $scope.category = 'All';
        $scope.logOut=function(){
            utils.destroyLocalStorage('userDetails');
            $scope.loginStatus=false;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $ionicSideMenuDelegate.toggleLeft();
            $state.go('app.home');

            
        }

        $scope.imageSel= ['0','0','0','0'] ;
        $scope.selectImageContainer = function(a){
             if($scope.imageSel[a] == 1){
                $scope.imageSel[a] = 0;
             }
             else {
                 $scope.imageSel[a] = 1;
             }

        }


        $scope.isSet = function (a) {
            return $scope.category === a;
        };
        $scope.setStore = function (a) {
            $scope.categoryId=a.key;
            $scope.$broadcast("getProductList");
            $scope.category = a.name;
        }

        $scope.productOpen = function (a) {
            console.log(a);
            $scope.selectedProd = a;
        }
        $scope.addProduct = function () {
            console.log('product Add Selected');
        }

        $scope.loginChange = function (a) {
            $scope.loginRegister = a;

        }


        // Pop up
        $scope.showPopup = function () {
            $scope.data = {};

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
                            if (!$scope.data.wifi) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                        }
                    }
                ]
            });

            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });


        };


        // Pop up



    };
})();


