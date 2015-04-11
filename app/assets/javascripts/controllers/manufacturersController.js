angular.module('autoControllers')
    .controller('ManufacturersCtrl', ['$scope', '$location', 'ManufacturersServices', 'CatalogServices',
        function($scope, $location, ManufacturersServices, CatalogServices) {
            ManufacturersServices.getAllManufacturers().success(function(data) {
                $scope.manufacturers = {};
                angular.forEach(data, function(item, index) {
                    if (!$scope.manufacturers[item.name.charAt(0)]) {
                        $scope.manufacturers[item.name.charAt(0)] = {};
                        $scope.manufacturers[item.name.charAt(0)].key = '';
                        $scope.manufacturers[item.name.charAt(0)].collection = [];
                    }
                    $scope.manufacturers[item.name.charAt(0)].key = item.name.charAt(0);
                    $scope.manufacturers[item.name.charAt(0)].collection.push(item);
                });

            });

            $scope.selectMF = function(manufacturer) {
                console.log(manufacturer);
                CatalogServices.setManufacturer(manufacturer);
                CatalogServices.setModel('');
                $location.path('catalog');
            };
        }
    ]);
