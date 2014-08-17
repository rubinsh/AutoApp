angular.module('autoDirectives')
    .directive('infiniteScroll',[
        function() {
            return function(scope, elm, attr) {
                $(window).bind('scroll', function() {
                    if ($(window).scrollTop() > $(document).height() - $(window).height() - 1000) {
                        scope.$apply(attr.infiniteScroll);
                        //console.log('infinity scroll fire');
                    }
                });

                elm.bind("$destroy", function() {
                    $(window).unbind('scroll');
                    //console.log("window unbind 'scroll' event ");
                });
            };
        }
    ]);
