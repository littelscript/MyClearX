(function () {

  var app = angular.module('myclearx');

  app.factory("imageUploadService", ['$cordovaFile','$cordovaDevice','$cordovaCamera', 'utils', '$cordovaVibration', '$q', '$cordovaActionSheet',
    function ($cordovaFile,$cordovaDevice,$cordovaCamera, utils, $cordovaVibration, $q, $cordovaActionSheet) {
      //$cordovaVibration.vibrate(100);
      var factory = {};
      factory.sourceType=null;

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
        factory.sourceType=sourceType;
        var options = {
          quality: 50,
          allowEdit: true,
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

      factory.fileUploadSetUp = function (imagePath) {
        var defer = $q.defer();
        var d = new Date(),
          n = d.getTime(),
         newFileName = n + ".jpg";
        if ($cordovaDevice.getPlatform() == 'Android' && factory.sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
          window.FilePath.resolveNativePath(imagePath, function (entry) {
            window.resolveLocalFileSystemURL(entry, success, fail);
            function fail(e) {
              console.error('Error: ', e);
            }

            function success(fileEntry) {
              var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
              // Only copy because of access rights
              $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function (success) {
               // $scope.image = cordova.file.dataDirectory + newFileName;;
                //$scope.imageName = cordova.file.dataDirectory + newFileName;
                defer.resolve(cordova.file.dataDirectory + newFileName);
              }, function (error) {
                defer.reject();
              });
            };
          }
          );
        } else {
          var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          // Move the file to permanent storage
          $cordovaFile.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            //$scope.image = cordova.file.externalCacheDirectory + '' + currentName;
           // $scope.imageName = cordova.file.externalCacheDirectory + '' + currentName;
            defer.resolve(cordova.file.externalCacheDirectory + '' + currentName);
            
          }, function (error) {
            //$scope.showAlert('Error', error.exception);
            defer.reject();
          });
        }

        
        return defer.promise;

      }


      return factory;



    }]);

})();