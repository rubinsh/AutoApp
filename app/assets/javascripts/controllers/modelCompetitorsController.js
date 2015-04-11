angular.module('autoControllers')
    .controller('ModelCompetitorsCtrl', ['$scope', '$routeParams', 'ModelCompetitorsServices',
        function($scope, $routeParams, ModelCompetitorsServices) {
            if ($routeParams.id) {
                $scope.hasCompetitors = true;

                ModelCompetitorsServices.getAllModelCompetitorsByCompetitorId($routeParams.id).success(function(data) {
                    if (data.length === 0) {
                        $scope.hasCompetitors = false;
                        $scope.noCompetitorsIndicator = 'למודל זה אין מתחרים!!!';
                    }
                    $scope.competitors = data;

                    console.log(data);
                });
            }
        }
    ]);
