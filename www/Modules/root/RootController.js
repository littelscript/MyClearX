(function () {
    var myclearx = angular.module('myclearx')

    myclearx.controller('RootController', ['utils', '$scope', '$http', '$ionicPopup', 'httpService','url',
        function (utils, $scope, $http, $ionicPopup, httpService,url) {
            $scope.categorylist = ['All', 'Pesticides', 'Insecticides', 'Fertilisers', 'Seeds'];
            $scope.packSize = ['Grams', 'Kgrams', 'tonn', 'mLiters', 'Liters']
            $scope.productList = [];
            $http.get("templates/data.json").then(function (response) {
                return $scope.productList = response.data;
            });
            httpService.getHttp(url.product,{"Product_order":1}).then(function(response){
                console.dir(response);
                $scope.productList = response.data;
            },function(){

            });

            $scope.loginRegister = "Login";
            $scope.editView = 0;
            $scope.products = [1, 2, 3, 4, 5, 6, 7, 8];
            $scope.category = 'All';




            $scope.isSet = function (a) {
                return $scope.category === a;
            };
            $scope.setStore = function (a) {
                $scope.category = a;
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



        }]);
})();


