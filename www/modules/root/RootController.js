(function () {
    var myclearx = angular.module('myclearx')

    myclearx.controller('RootController', rootContoller);
    rootContoller.$inject = ['$ionicScrollDelegate','$ionicSideMenuDelegate', '$ionicHistory', 'utils', '$scope', '$http', '$ionicPopup', 'httpService', 'url', '$state'];
    function rootContoller($ionicScrollDelegate,$ionicSideMenuDelegate, $ionicHistory, utils, $scope, $http, $ionicPopup, httpService, url, $state) {
        $scope.categorylist = [{ "name": "All", "key": 0 }, { "name": "Pesticides", "key": 1 }, { "name": "Insecticides", "key": 2 }, { "name": "Fertilisers", "key": 4 }, { "name": "Seeds", "key": 3 }];
        $scope.packSize = ['Grams', 'Kgrams', 'tonn', 'mLiters', 'Liters']
        $scope.productList = [];
        $scope.cartItems = [];
        $scope.categoryId = 0;
        if (utils.getLocalStorage("cartItems")) {

            $scope.cartItems = utils.getLocalStorage("cartItems");
        }
        $scope.loginStatus = false;
        $scope.User_type = 1;
        var userDetails = null;
        if (utils.getLocalStorage("userDetails")) {
            $scope.loginStatus = true;
            userDetails=utils.getLocalStorage("userDetails");
            $scope.User_type=userDetails.User_type;
        }
        $scope.$on("loginSuccess", function () {
            $scope.loginStatus = true;
            userDetails=utils.getLocalStorage("userDetails");
            $scope.User_type=userDetails.User_type;
        });

        $scope.$on("productData", function (e, response) {
            $scope.productList = response.data;
        });

        $scope.$on("cartToLocal", function (e, cartData) {
            utils.setLocalStorage("cartItems", cartData);
        });


        $scope.filenameSel = false;

        $scope.uploadFile = function (files) {
            var fileName = files[0].name;
            $scope.filenameSel = fileName;
            console.log($scope.filenameSel);
            
        };



        $scope.loginRegister = "Login";
        $scope.editView = 0;
        $scope.products = [1, 2, 3, 4, 5, 6, 7, 8];
        $scope.category = 'All';
        $scope.logOut = function () {
            utils.destroyLocalStorage('userDetails');
            $scope.loginStatus = false;
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $scope.User_type=1;
            $ionicSideMenuDelegate.toggleLeft();
            $state.go('app.home');


        }

        


        $scope.isSet = function (a) {
            return $scope.category === a;
        };
        $scope.setStore = function (a) {
            $scope.categoryId = a.key;
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
            $ionicScrollDelegate.resize();

        }





        // Pop up



    };
})();


