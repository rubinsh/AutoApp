angular.module('autoDirectives')
.directive('catalogButton', ['$templateCache',
		   function($templateCache) {
			 return {
			   restrict: 'E',
			   template: $templateCache.get('catalogButton'),
			  //  link: function(scope, elem, attrs) {
			  //
			  //  };
		    }
      }
]);
