angular.module('autoServices')
.factory('AdService', ['$window','$route',
         function($window, $route) {
           var resource = {};
           resource.noBannerRoutes = ["/consulting"]

           resource.init = function() {
             console.debug("init");
             $window.localStorage.setItem("autoMag.adCounter",0);
           }

           resource.reset = function() {
             $window.localStorage.setItem("autoMag.adCounter",0);
             $window.localStorage.setItem("autoMag.showingAd",false);
           }

           resource.needToShowAd = function() {
             return (Number.parseInt($window.localStorage.getItem("autoMag.adCounter")) === 0)
           }

           resource.showAd = function() {
             window.localStorage.setItem("autoMag.showingAd","true");
             window.location.href = "/maavron.html?route_back=" + window.location.href;
           }

           resource.advanceCounter = function() {
             var counter = Number.parseInt($window.localStorage.getItem("autoMag.adCounter")) || 0;
             counter += 1;
             counter %= 3;
             $window.localStorage.setItem("autoMag.adCounter",counter);

           }

           resource.backFromAd = function() {
             return ($window.localStorage.getItem("autoMag.showingAd") === "true");
           }

           resource.showBanner = function() {
             if ($route.current && $.inArray($route.current.$$route.originalPath, resource.noBannerRoutes) > -1) {
               return false;
             }
             else {
               return true;
             }
           }

           return resource;
         }
]);
