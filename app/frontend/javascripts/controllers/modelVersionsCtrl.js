angular.module('autoControllers')
.controller('ModelVersionsCtrl', ['$scope', '$routeParams', 'VersionsServices', 'CatalogServices',
            function($scope, $routeParams, VersionsServices, CatalogServices) {
              // $scope.modelId = $routeParams.id; // CatalogServices.getModelId();
              $scope.modelId = CatalogServices.getModelId();

              console.log('CatalogServices.getModelId() : ' + $scope.modelId);
              console.log('$routeParams.id : ' + $routeParams.id);
              console.log($routeParams);
              if ($routeParams.id) {
                VersionsServices.getAllModelVersionsByModelId($routeParams.id).success(function(data) {
                  $scope.versions = data;
                  console.log(data);
                });
              } else if ($scope.modelId > 0) {
                VersionsServices.getAllModelVersionsByModelId($scope.modelId).success(function(data) {
                  $scope.versions = data;
                  console.log(data);
                });
              }
            }
]);
