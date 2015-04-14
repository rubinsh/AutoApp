angular.module('autoDirectives')
    .directive('setclass',
        function() {
            return {
                restrict: 'A',
                scope: {
                    condition: '=',
                    classname: '@'
                },
                link: function(scope, elm, attr) {
                    scope.$watch('condition', function(newContent) {
                        if (newContent === true) {
                            $(elm).addClass(scope.classname);
                            $(elm).text('');
                        }
                    });
                }
            };
        }
);