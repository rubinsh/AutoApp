angular.module('autoDirectives')
    .directive('startsimage',[
        function() {
            return {
                restrict: 'A',
                scope: {
                    starstext: '@'
                },
                link: function(scope, element) {
                    scope.$watch('starstext', function(newValue) {
                        var star = parseInt(newValue);

                        if (star) {
                            var imgHtml = '';
                            for (var i = 0; i < star; i++)
                                imgHtml += '<img alt="" src="http://api.auto.co.il/m/images/star.png" />&nbsp';
                            element.html(imgHtml);
                        }
                    });
                }
            };
        }
    ]);
