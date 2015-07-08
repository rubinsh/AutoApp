angular.module('autoServices')
.factory('AdService', ['$window','$route', '$location',
        function($window, $route, $location) {
   $window.showingMaavron = false;
           var resource = {};
           resource.noBannerRoutes = ["/consulting"]

           resource.init = function() {
             $window.localStorage.setItem("autoMag.adCounter",0);
             $window.localStorage.setItem("autoMag.showingAd",false);
   };

           resource.reset = function() {
             $window.localStorage.setItem("autoMag.adCounter",0);
             $window.localStorage.setItem("autoMag.showingAd",false);
   };

           resource.needToShowAd = function() {
     return (parseInt($window.localStorage.getItem("autoMag.adCounter")) === 0);
   };

           resource.getBannerUrl = function(seed) {
              return "banner.html?cachebust=" + seed;
  };

           resource.getBigBannerUrl = function(seed) {
            return "big-banner.html?cachebust=" + seed;
  };

           resource.showAd = function() {
   $window.showingMaavron = true;
             $('.automag-app').css('visibility','hidden');
             $('.auto-maavron').css('display','block');
             $('.auto-ad-container').css('display','none');
             window.setTimeout(function() {
     $window.showingMaavron = false;
               $('.auto-maavron').css('display','none');
               $('.automag-app').css('visibility','visible');
               $('.auto-ad-container').css('display','block');
   },5000);
 };

           resource.advanceCounter = function() {
             var counter = parseInt($window.localStorage.getItem("autoMag.adCounter")) || 0;
             counter += 1;
             counter %= 3;
             $window.localStorage.setItem("autoMag.adCounter",counter);

 };

 resource.showBanner = function() {
  if ($window.showingMaavron) {
    return false;
  }
  if ($.inArray($location.path(), resource.noBannerRoutes) > -1)
  {
   return false;
 }
 else {
   return true;
 }
};

           return resource;
         }
]);
