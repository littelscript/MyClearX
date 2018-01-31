(function () {

    var app = angular.module('myclearx');

    app.service("utils", ['$q', '$ionicPopup', '$ionicLoading', function ($q, $ionicPopup, $ionicLoading) {

        /* Local storage code */
        this.baseUrl = "http://myClearx.com/myclearx/";
        var Gcm_id = null;
        //this.Gcm_id = Gcm_id.data;
        this.setLocalStorage = function (key, value) {
            return localStorage.setItem(key, JSON.stringify(value));
        }
        this.getLocalStorage = function (key) {

            if (localStorage.getItem(key) == "undefined") {
                return false;
            }
            return JSON.parse(localStorage.getItem(key));
        }
        this.destroyLocalStorage = function (key) {
            return localStorage.removeItem(key);
        }
        /* Local storage code end */
        this.loaderShow = function () {

            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        }

        this.loaderHide = function () {

            $ionicLoading.hide();
        }

        this.showAlert = function (msg) {
            var defer = $q.defer();
            var alertPopup = $ionicPopup.alert({
                title: 'Alert',
                template: msg
            });

            alertPopup.then(function (res) {
                // Custom functionality....
                defer.resolve();
            });
            return defer.promise;
        };

        this.showConfirm = function () {
            var defer = $q.defer();
            var confirmPopup = $ionicPopup.confirm({
                title: 'Confirm',
                template: 'Are you sure you want to remove item?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    defer.resolve();
                } else {
                    defer.reject();
                }
            });
            return defer.promise;
        };

        this.getGcm = function () {

            push = PushNotification.init({
                android: {
                    senderID: "553290549221",
                    forceShow: true
                },
                browser: {
                    pushServiceURL: 'http://push.api.phonegap.com/v1/push'
                },
                ios: {
                    senderID: "553290549221",
                    alert: "true",
                    badge: "true",
                    sound: "true",
                    gcmSandbox: "true",
                    forceShow: true
                },
                windows: {}
            });

            push.on('registration', function (data) {
                // data.registrationId
                Gcm_id = data.registrationId;
                //alert(data.registrationId);
                console.dir(data);
            });

            push.on('notification', function (data) {

                //console.dir(data);
                //alert(data);
                // data.message,
                // data.title,
                // data.count,
                // data.sound,
                // data.image,
                // data.additionalData
            });

            push.on('error', function (e) {
                // e.message
            });


        }
        this.getGCMId = function () {

            return Gcm_id;
        }

        //add 2 hours
        this.addHours = function (date_time) {

            return moment(date_time).add(2, 'h').add(30, 'm').format('YYYY-MM-DD HH:mm:ss');
        }

        //Subtract 30 minutes
        this.subtractMints = function (date_time) {

            return moment(date_time).subtract(30, 'm').format('YYYY-MM-DD HH:mm:ss');
        }

        this.dateBetweenStatus = function (start, between, end) {

            return moment(between).isBetween(start, end);
        }
        this.formatDate = function (data) {
            var date = new Date(data);
            var dateString=date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
            return dateString;
        }



    }]);

})();