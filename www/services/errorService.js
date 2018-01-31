(function () {

    var app = angular.module('myclearx');

    app.factory("errorService", [function () {
        var factory={

            "000":"",
            "100":"Please wait..",
            "102":"Details updated successfully.",
            "103":"Application activated successfully.",
            "104":"Application deactivated successfully.",
            "105":"Sent successfully. we will back to you soon.",
            "106":"Are sure to delete this item?",
            "400":"Invalid user details!",
            "500":"Contact service provider!",
            "501":"Please enter registered number!",
            "502":"No record found!",
            "503":"Unable to get your location.<br>Please check your gps & try again",
            "504":"Email already exist!",
            "601":"Please select location!",
            "602":"Image not more than 4!",
            "default":"Please try again!"


        };

            

        return factory;
       
    }]);

})();