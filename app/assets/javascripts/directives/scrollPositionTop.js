angular.module('autoDirectives')
    .directive('scrollpositiontop',[
        function() {
            return {
                restrict: 'A',
                scope: {
                    visible: '='
                },
                link: function(scope, elm) {
                    scope.$watch('visible', function(newVal) {
                        if (newVal)
                            $(elm).scrollTop(0);
                        console.log(newVal);
                    });
                }
            };
        }
    ]);
