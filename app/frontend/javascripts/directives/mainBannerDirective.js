angular.module('autoDirectives')
.directive('mainBanner', ['$templateCache',
       function($templateCache) {
       return {
         restrict: 'E',
         template: $templateCache.get('mainBanner'),
        //  link: function(scope, elem, attrs) {
        //
        //  };
        }
      }
]);
