angular.module('autoControllers')
    .controller('ModelsCtrl', ['$scope', '$location', '$routeParams', 'ManufacturersServices', 'CatalogServices',
        function($scope, $location, $routeParams, ManufacturersServices, CatalogServices) {
            $scope.manufacturerId = CatalogServices.getManufacturerId() || $routeParams.id;
            $scope.newOrUsed = 'true';
            $scope.selectedIndex = 0;
            $scope.optionsArr = [{
                name: 'חדש',
                value: 'new=true'
            }, {
                name: 'משומש',
                value: 'new=false'
            }];

            ManufacturersServices.getAllModelsByManufacturerId($scope.manufacturerId).success(function(data) {
                $scope.models = {};
                angular.forEach(data, function(item, index) {
                    if (!$scope.models[item.name.charAt(0)]) {
                        $scope.models[item.name.charAt(0)] = {};
                        $scope.models[item.name.charAt(0)].key = '';
                        $scope.models[item.name.charAt(0)].collection = [];
                    }
                    $scope.models[item.name.charAt(0)].key = item.name.charAt(0);
                    $scope.models[item.name.charAt(0)].collection.push(item);
                });
            });

            $scope.itemClicked = function(index) {
                $scope.selectedIndex = index;
            };

            $scope.onSelectM = function(model) {
                CatalogServices.setModel(model);
                CatalogServices.setNewOrUsedData($scope.optionsArr[$scope.selectedIndex].value);
                $location.url('catalog','catalog/manufacturers/' + $scope.manufacturerId + '/models');
            };
        }
    ]);
