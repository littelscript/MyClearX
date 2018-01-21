(function () {
    var myclearx = angular.module('myclearx', ['ionic', 'myclearxControllers'])

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
        templateUrl: 'templates/menu.html'/*,
        controller: 'AppCtrl'*/
    })

  .state('app.home', {
      url: '/home',
      views: {
          'menuContent': {
              templateUrl: 'templates/home.html'//,
             // controller: 'homeController'
          }
      }
  })
  .state('app.cart', {
      url: '/cart',
      views: {
          'menuContent': {
              templateUrl: 'templates/cart.html'

          }
      }
  })
  .state('app.search', {
      url: '/search',
      views: {
          'menuContent': {
              templateUrl: 'templates/search.html'

          }
      }
  }).state('app.viewproduct', {
      url: '/home/:productId',
      views: {
          'menuContent': {
              templateUrl: 'templates/product.html',
              controller: 'productController'

          }
      }
  }).state('app.profile', {
      url: '/profile',
      views: {
          'menuContent': {
              templateUrl: 'templates/profile.html'

          }
      }
  }).state('app.prodmgmt', {
      url: '/productManage',
      views: {
          'menuContent': {
              templateUrl: 'templates/productmgmt.html'

          }
      }
  }).state('app.addProduct', {
      url: '/addProduct',
      views: {
          'menuContent': {
              templateUrl: 'templates/addProduct.html'

          }
      }
  }).state('app.login', {
      url: '/login',
      views: {
          'menuContent': {
              templateUrl: 'templates/login.html'

          }
      }
  });




    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});


})();
