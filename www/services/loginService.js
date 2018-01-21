(function () {

    var app = angular.module('myclearx');

    app.service("webServiceCall", ['utils', '$q','$http', function (utils,$q,$http) {


        this.getWebServiceCall = function (url,data) {
            var defer = $q.defer();
            data.Gcm_id=utils.getGCMId();
            utils.loaderShow();
            $http({
                method: 'POST',
                url: url,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                data: data
            }).success(function (reponse) {
                utils.loaderHide();
                defer.resolve(reponse);
            }).error(function () {

                defer.reject();
            });
            return defer.promise;
        }
        


    }]);

    app.factory("endPointUrl", ['utils', function (utils) {

          var factory={};

          factory.login=utils.baseUrl+'login/login.php';
          factory.signup=utils.baseUrl+'sinup/sinup.php';
          factory.products=utils.baseUrl+'product/product.php';


          return factory;

    }]);

})();