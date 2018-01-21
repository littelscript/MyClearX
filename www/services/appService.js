(function () {

    var app = angular.module('myclearx');

    app.factory("appService", ['utils', function (utils) {

        var factory={};
        
        factory.cartItems=[];


       return factory;



    }]);

})();