/* App Module */
var autoModuleApp = angular.module("main", [
  'ngRoute',
  // 'ngIOS9UIWebViewPatch',
  'ngResource',
  'ngAnimate',
  // 'ngTouch', //removed because it fucks up the maavronim
  'angular-cache',
  'slickCarousel',
  'matchmedia-ng',
  'angular-loading-bar',
  'autoServices',
  'autoControllers',
  'autoDirectives'
]);

window.localStorageSupported = function() {
     try {
       $window.localStorage.setItem("autoMag.test",0);
       return true;
     }
     catch(err) {
       return false;
     }
};

var storageMode = localStorageSupported() ? "localStorage" : "memory";

autoModuleApp.run(["$window", "$templateCache", "$http", "CacheFactory" , function($window, $templateCache, $http, CacheFactory) {
  angular.forEach($window.JST, function(elem,index) {
    $templateCache.put(index,elem());
  });

  $http.defaults.cache = CacheFactory('defaultCache', {
    maxAge: 15 * 60 * 1000, // Items added to this cache expire after 15 minutes
    cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
    deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
    storageMode: storageMode
  });

  $http.defaults.headers.get = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  };
}]);
/* App Module Dependencies*/
var autoControllers = angular.module('autoControllers', []);
var autoDirectives = angular.module('autoDirectives', []);
var autoServices = angular.module('autoServices', ['ngResource']);
