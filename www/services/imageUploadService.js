(function () {

  var app = angular.module('myclearx');

  app.factory("imageUploadService", ['$cordovaCamera', 'utils', '$cordovaVibration', '$q', '$cordovaActionSheet',
    function ($cordovaCamera, utils, $cordovaVibration, $q, $cordovaActionSheet) {
      //$cordovaVibration.vibrate(100);
      var factory = {};

      //factory.cartItems=[];

      factory.getActionSheet = function () {
        var defer = $q.defer();
        var options = {
          title: 'Select Image Source',
          buttonLabels: ['Load from Library', 'Use Camera'],
          addCancelButtonWithLabel: 'Cancel',
          androidEnableCancelButton: true,
        };
        $cordovaActionSheet.show(options).then(function (btnIndex) {
          var type = null;
          if (btnIndex === 1) {
            type = Camera.PictureSourceType.PHOTOLIBRARY;
          } else if (btnIndex === 2) {
            type = Camera.PictureSourceType.CAMERA;
          }
          defer.resolve(type);
        });
        return defer.promise;
      }

      factory.selectPicture = function (sourceType) {
        var defer = $q.defer();
        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: sourceType,
          targetWidth: 200,
          targetHeight: 200,
          saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function (imagePath) {
          defer.resolve(imagePath);

        }, function () {
          defer.reject();
        });
        return defer.promise;



      }

      factory.uploadImage = function () {
        // Destination URL
        var url = "http://fleetcommando.com/savekids/upload.php";
        var targetPath = $scope.imageName;
        var filename = $scope.imageName;;
        var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "multipart/form-data",
          params: {
            'fileName': filename.replace(/^.*[\\\/]/, ''), "User_id": User_id,
            "Name": $scope.upload.Name, "Address": $scope.upload.Address, "Location": $scope.upload.Location
          }
        };
        utils.loaderShow();
        $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
          utils.loaderHide();
          $scope.showAlert('Success', 'Image upload finished.');
        }, function () {
          utils.loaderHide();
          $scope.showAlert('Error', 'Error in image uploading.');
        });
      }


      return factory;



    }]);

})();