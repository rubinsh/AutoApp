angular.module('autoControllers')
.controller('CatalogCtrl', ['$scope', '$location', 'ManufacturersServices', 'CatalogServices',
            function($scope, $location, ManufacturersServices, CatalogServices) {
              //$scope.manufacturer = '';
              //$scope.model = '';
              //$scope.modelId = 0;
              $scope.newOrUsed = '';

              $scope.manufacturerName = 'כל היצרנים  >';
              $scope.modelName = 'כל הדגמים  >';

              $scope.$watch(CatalogServices.manufacturer, function() {
                $scope.manufacturerSelected = false;
                $scope.manufacturer = CatalogServices.getManufacturer();
                if ($scope.manufacturer && $scope.manufacturer.name) {
                  $scope.manufacturerSelected = true;
                  $scope.manufacturerName = $scope.manufacturer.name + '  >';
                  $scope.model = '';
                }
              }, true);

              $scope.$watch(CatalogServices.model, function() {
                $scope.model = CatalogServices.getModel();
                $scope.newOrUsed = CatalogServices.getNewOrUsed();

                if ($scope.model && $scope.model.name) {
                  $scope.modelId = $scope.model.id;
                  $scope.modelName = $scope.model.name + '  >';

                }
              }, true);

              var getSearchUrl = function() {
                if (!$scope.manufacturer) return "";
                console.log($scope.model);
                var modelUrl = $scope.model !== "" ? "/models/" + $scope.model.model_id : "";
                return 'catalog/manufacturers/' + $scope.manufacturer.id + modelUrl;
                //if ($scope.newOrUsed === '' || $scope.newOrUsed === 'new=true') {
                //  $scope.searchUrl = 'catalog/manufacturers/' + $scope.manufacturer.id + '/models/' + $scope.model.id;
                //} else {
                //  $scope.searchUrl = 'catalog/models/' + $scope.model.id + '/useds?' + $scope.newOrUsed;
                //}

              };

              $scope.selectManufacturer = function() {
                $location.path("catalog/manufacturers");
              };

              $scope.selectModel = function(manufacturerId) {
                $location.path("catalog/manufacturers/" + manufacturerId + "/models");
              };

              $scope.performSearch = function() {
                $location.path(getSearchUrl());
              };
            }
]);
