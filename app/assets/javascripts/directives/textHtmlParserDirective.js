angular.module('autoDirectives')
    .directive('texthtmlparser', ['$sce',
        function($sce) {
            return {
                restrict: 'A',
                scope: {
                    texthtml: '@'
                },
                link: function(scope, element) {
                    scope.$watch('texthtml', function(newContent) {
                        element.html($sce.trustAsHtml(newContent).toString());
                    });
                }
            };
        }
    ]);
