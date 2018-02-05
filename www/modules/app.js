(function () {
    var myclearx = angular.module('myclearx', ['ionic', 'ngCordova'])

        .run(function ($ionicPlatform, $state,$cordovaToast) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {

                    StatusBar.styleDefault();
                }
            });
            var exitStatus = false
            $ionicPlatform.registerBackButtonAction(function (e) {
                if ($state.is('app.home')) {
                    if (exitStatus) { // here to check whether the home page, if yes, exit the application

                        navigator.app.exitApp();

                    } else {
                        $cordovaToast
                        .showShortCenter('Press back button again to exit.')
                        .then(function(success) {
                          // success
                        }, function (error) {
                          // error
                        });
                        setTimeout(function () {
                            exitStatus = false;
                        }, 2000);
                    }
                    if (!exitStatus) {
                        exitStatus = true;
                    }
                }else{
                    //$state.go('app.home');
                }
                e.preventDefault();
                return false;
            }, 101);


        })



        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'modules/root/templates/menu.html'/*,
                    controller: 'AppCtrl'*/
                })

                .state('app.home', {
                    url: '/home',
                    cache: false,
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/root/templates/home.html',
                            controller: 'HomeController'
                        }
                    }
                })
                .state('app.cart', {
                    url: '/cart',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/cart/templates/cart.html',
                            controller: "CartController"

                        }
                    }
                })
                .state('app.search', {
                    url: '/search',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/search/templates/search.html',
                            controller: "SearchController"

                        }
                    }
                }).state('app.viewproduct', {
                    url: '/home/:productId',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/product/templates/product.html',
                            controller: 'ProductController'

                        }
                    }
                }).state('app.profile', {
                    url: '/profile',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/profile/templates/profile.html',
                            controller: 'ProfileController'

                        }
                    }
                }).state('app.prodmgmt', {
                    url: '/productManage',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/productManage/templates/productmgmt.html',
                            controller: "ProductManageController"

                        }
                    }
                }).state('app.addProduct', {
                    url: '/addProduct',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/addProduct/templates/addProduct.html',
                            controller: "AddProductController"
                        }
                    }
                }).state('app.login', {
                    url: '/login',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/login/templates/login.html',
                            controller: "LoginController"

                        }
                    }
                });




            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');
        });


})();
