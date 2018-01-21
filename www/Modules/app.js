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
                    templateUrl: 'Modules/root/templates/menu.html'/*,
        controller: 'AppCtrl'*/
                })

                .state('app.home', {
                    url: '/home',
                    views: {
                        'menuContent': {
                            templateUrl: 'Modules/root/templates/home.html'//,
                            // controller: 'homeController'
                        }
                    }
                })
                .state('app.cart', {
                    url: '/cart',
                    views: {
                        'menuContent': {
                            templateUrl: 'Modules/cart/templates/cart.html'

                        }
                    }
                })
                .state('app.search', {
                    url: '/search',
                    views: {
                        'menuContent': {
                            templateUrl: 'Modules/search/templates/search.html'

                        }
                    }
                }).state('app.viewproduct', {
                    url: '/home/:productId',
                    views: {
                        'menuContent': {
                            templateUrl: 'Modules/product/templates/product.html',
                            controller: 'ProductController'

                        }
                    }
                }).state('app.profile', {
                    url: '/profile',
                    views: {
                        'menuContent': {
                            templateUrl: 'Modules/profile/templates/profile.html'

                        }
                    }
                }).state('app.prodmgmt', {
                    url: '/productManage',
                    views: {
                        'menuContent': {
                            templateUrl: 'Modules/productManage/templates/productmgmt.html'

                        }
                    }
                }).state('app.addProduct', {
                    url: '/addProduct',
                    views: {
                        'menuContent': {
                            templateUrl: 'Modules/addProduct/templates/addProduct.html'

                        }
                    }
                }).state('app.login', {
                    url: '/login',
                    views: {
                        'menuContent': {
                            templateUrl: 'Modules/login/templates/login.html'

                        }
                    }
                });




            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');
        });


})();
