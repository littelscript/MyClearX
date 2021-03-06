(function () {

    var app = angular.module('myclearx');

    app.service("httpService", ['utils', '$q','$http', function (utils,$q,$http) {


        this.getHttp = function (url,data) {
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

    app.factory("url", ['utils', function (utils) {

          var factory={};

          factory.login=utils.baseUrl+'login/login.php';
          factory.signup=utils.baseUrl+'sinup/sinup.php';
          factory.product=utils.baseUrl+'product/product.php';
          factory.addProduct=utils.baseUrl+'product/addProduct.php';
          factory.getProductById=utils.baseUrl+'product/getProductById.php';
          factory.deleteProduct=utils.baseUrl+'product/deleteProduct.php';
          factory.updateProfile=utils.baseUrl+'profile/updateProfile.php';
          factory.updateProduct=utils.baseUrl+'product/updateProduct.php';
          factory.otpsinup=utils.baseUrl+'sinup/otpsinup.php';
          factory.forgotpassword=utils.baseUrl+'forgotpassword/forgotpassword.php';
          factory.getAdmin=utils.baseUrl+'admin/getAdmin.php';



          return factory;

    }]);

})();