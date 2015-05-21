angular.module('autoControllers')
    .controller('AllManufacturerModelsCtrl', ['$scope','$location', '$routeParams', 'SearchServices', 'CatalogServices',
        function($scope, $location, $routeParams, SearchServices, CatalogServices) {
            $scope.manufacturerId = $routeParams.id;

            if ($scope.manufacturerId) {
                SearchServices.getSearchResaulForAllManufacturerModels($scope.manufacturerId).success(function(data) {
                    $scope.models = data;
                });
            }

            $scope.setModel = function(model) {
                CatalogServices.setModel(model);
                $location.path('/catalog/models/' + model.model_id);
            };
        }
    ]);
