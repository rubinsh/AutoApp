angular.module('autoServices')
.factory('AdService', ['$window','$route', '$location',
function($window, $route, $location) {
  $window.showingMaavron = false;
  var resource = {};
  $window.adCounter = 0;
  resource.noBannerRoutes = ["/consulting"]

  resource.init = function() {
    if (localStorageSupported()) {
      $window.localStorage.setItem("autoMag.adCounter",0);
      $window.localStorage.setItem("autoMag.showingAd",false);
    }
  };

  resource.reset = function() {
    if (localStorageSupported()) {
      $window.localStorage.setItem("autoMag.adCounter",0);
      $window.localStorage.setItem("autoMag.showingAd",false);
    }
  };

  resource.needToShowAd = function() {
    if (localStorageSupported()) {
      return (parseInt($window.localStorage.getItem("autoMag.adCounter")) === 0);
    }
    else {
      return ($window.adCounter === 0);
    }
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
    $('#auto-bottom-ad-container').addClass('hidden');
    window.setTimeout(function() {
      $window.showingMaavron = false;
      $('.auto-maavron').css('display','none');
      $('.automag-app').css('visibility','visible');
      $('.auto-ad-container').css('display','block');
      $('#auto-bottom-ad-container').removeClass('hidden');
    },5000);
  };

  resource.advanceCounter = function() {
    if (localStorageSupported()) {
      var counter = parseInt($window.localStorage.getItem("autoMag.adCounter")) || 0;
      counter += 1;
      counter %= 3;
      $window.localStorage.setItem("autoMag.adCounter",counter);
    }
    else {
      $window.adCounter |= 0;
      $window.adCounter += 1;
      $window.adCounter %= 3;
    }
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
