(function () {
    var myclearx = angular.module('myclearx', ['ionic'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {

                    StatusBar.styleDefault();
                }
            });


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
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/root/templates/home.html'//,
                            // controller: 'homeController'
                        }
                    }
                })
                .state('app.cart', {
                    url: '/cart',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/cart/templates/cart.html'

                        }
                    }
                })
                .state('app.search', {
                    url: '/search',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/search/templates/search.html',
                            controller:"SearchController"

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
                            templateUrl: 'modules/profile/templates/profile.html'

                        }
                    }
                }).state('app.prodmgmt', {
                    url: '/productManage',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/productManage/templates/productmgmt.html'

                        }
                    }
                }).state('app.addProduct', {
                    url: '/addProduct',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/addProduct/templates/addProduct.html'

                        }
                    }
                }).state('app.login', {
                    url: '/login',
                    views: {
                        'menuContent': {
                            templateUrl: 'modules/login/templates/login.html'

                        }
                    }
                });




            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');
        });


})();
