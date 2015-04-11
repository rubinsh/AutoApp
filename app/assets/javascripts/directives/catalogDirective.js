angular.module('autoDirectives')
    .directive('catalog',[
        function() {
            return {
                restrict: 'E',
                scope: {
                    manufactureselected: '@',
                    modelselected: '@',
                    lookurl: '@',
                    manufacturename: '@',
                    modelname: '@'
                },
                link: function(scope, element) {
                    scope.$watch('manufactureselected', function(value) {
                        console.log('manufactureselected: ' + value);
                        scope.manufacturerSelected = (value === 0 ? true : false);
                    });

                    scope.$watch('modelselected', function(value) {
                        scope.continueflag = (value === 0 ? true : false);
                    });

                    scope.$watch('lookurl', function(value) {
                        scope.url = value;
                    });

                    scope.$watch('manufacturename', function(value) {
                        scope.manufactrureName = value;
                    });

                    scope.$watch('modelname', function(value) {
                        scope.modelName = value;
                    });
                },
                template: '<div class="row" >' +
                    '<div class="twelve columns">' +
                    '<a href="#/catalog/manufacturers" class="nice small button success radius round expand">' +
                    '<div class="small-6 columns text-right">בחר יצרן</div>' +
                    '<div class="small-6 columns text-left">{{manufactrureName}}</div>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row" >' +
                    '<div class="twelve columns">' +
                    '<a href="#/catalog/models" class="nice small button success radius round expand" ng-disabled="manufacturerSelected">' +
                    '<div class="small-6 columns text-right">בחר דגם</div>' +
                    '<div class="small-6 columns text-left">{{modelName}}</div>' +
                    '</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row" >' +
                    '<div class="twelve columns text-center">' +
                    '<a href="#/{{url}}" class="nice medium button alert round expand" ng-disabled="manufacturerSelected">חפש</a>' +
                    '</div>' +
                    '</div>'
            };
        }
    ]);
