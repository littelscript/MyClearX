(function () {

    var app = angular.module('myclearx');

    app.service("settingService", ['utils', '$q','$http', function (utils,$q,$http) {


        this.getSetting = function (data) {
            var defer = $q.defer();
            //data.Gcm_id=utils.Gcm_id;
            utils.loaderShow();
            $http({
                method: 'POST',
                url: utils.baseUrl+'Setting/Setting.php',
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

        this.saveSetting = function (data) {
            var defer = $q.defer();
            //data.Gcm_id=utils.Gcm_id;
            utils.loaderShow();
            $http({
                method: 'POST',
                url: utils.baseUrl+'SettingUpdate/SettingUpdate.php',
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

        this.getNotification = function (data) {
            var defer = $q.defer();
            //data.Gcm_id=utils.Gcm_id;
            utils.loaderShow();
            $http({
                method: 'POST',
                url: utils.baseUrl+'Notification/getNotification.php',
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

        this.onOffApp = function (data) {
            var defer = $q.defer();
            //data.Gcm_id=utils.Gcm_id;
            utils.loaderShow();
            $http({
                method: 'POST',
                url: utils.baseUrl+'OnOFF/OnOFF.php',
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

        this.sendSupport = function (data) {
            var defer = $q.defer();
            //data.Gcm_id=utils.Gcm_id;
            utils.loaderShow();
            $http({
                method: 'POST',
                url: utils.baseUrl+'Support/support.php',
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

})();