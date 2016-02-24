angular.module('autoDirectives')
.directive('shareButtons', ['$templateCache',
           function($templateCache) {
             return {
               scope: {
                 url: '@',
                 title: '@'
               },
               restrict: 'E',
               template: $templateCache.get('shareButtons'),
             }
           }
]);
