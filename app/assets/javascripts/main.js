/* App Module */
var autoModuleApp = angular.module("main", [
  'ngRoute',
  'ngResource',
  'restangular',
  'ngAnimate',
  'ngTouch',
  'jmdobry.angular-cache',
  'angular-carousel',
  'matchmedia-ng',
  'chieffancypants.loadingBar',
  'autoServices',
  'autoControllers',
  'autoDirectives'
]);

autoModuleApp.run(["$window", "$templateCache", "$http", "$angularCacheFactory", function($window, $templateCache, $http, $angularCacheFactory) {
  angular.forEach($window.JST, function(elem,index) {
    $templateCache.put(index,elem());
  });
  $angularCacheFactory('defaultCache', {
    maxAge: 900000, // Items added to this cache expire after 15 minutes.
    cacheFlushInterval: 6000000, // This cache will clear itself every hour.
    deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
    storageMode: 'localStorage'
  });

  $http.defaults.cache = $angularCacheFactory.get('defaultCache'); //set all requests done with $http to work with this cache...
  $http.defaults.headers.get = {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  };
}]);
/* App Module Dependencies*/
var autoControllers = angular.module('autoControllers', []);
var autoDirectives = angular.module('autoDirectives', []);
var autoServices = angular.module('autoServices', ['ngResource']);


