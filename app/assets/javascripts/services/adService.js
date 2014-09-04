angular.module('autoServices')
.factory('AdService', ['$window','$route',
         function($window, $route) {
           var resource = {};
           resource.noBannerRoutes = ["/consulting"]

           resource.init = function() {
             console.debug("init");
             $window.localStorage.setItem("autoMag.adCounter",0);
             $window.localStorage.setItem("autoMag.showingAd",false);
           }

           resource.reset = function() {
             $window.localStorage.setItem("autoMag.adCounter",0);
             $window.localStorage.setItem("autoMag.showingAd",false);
           }

           resource.needToShowAd = function() {
             //(navigator.userAgent.toLowerCase().indexOf("firefox") === -1)
             return (Number.parseInt($window.localStorage.getItem("autoMag.adCounter")) === 1)
           }

           resource.showAd = function() {
             //window.localStorage.setItem("autoMag.showingAd","true");
             $('.automag-app').css('visibility','hidden');
             $('.auto-maavron').css('display','block');
             $('.auto-ad-container').css('display','none');
             window.setTimeout(function() {
               $('.auto-maavron').css('display','none');
               $('.automag-app').css('visibility','visible');
               $('.auto-ad-container').css('display','block');
             },3000);
             //window.location.href = "/maavron.html?route_back=" + window.location.href;
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
             if ($route.current && $.inArray($route.current.$$route.originalPath, resource.noBannerRoutes) > -1)
             {
               return false;
             }
             else {
               return true;
             }
           }

           return resource;
         }
]);
