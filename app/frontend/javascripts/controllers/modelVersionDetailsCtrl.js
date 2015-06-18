angular.module('autoControllers')
    .controller('ModelVersionDetailsCtrl', ['$timeout', '$scope', '$routeParams', 'VersionsServices', 'CatalogServices',
        function($timeout, $scope, $routeParams, VersionsServices, CatalogServices) {
            var model_id = $routeParams.modelId;
            var version_id = $routeParams.versionId;
            $scope.showContent = false;

            console.log($routeParams);
            VersionsServices.getModelVersionDetailsByModelIDAndVersionID(model_id, version_id)
            .success(function(data) {
                $scope.title = data[0].name;
                $scope.versionDetails = VersionsServices.convertVersionDetailsToViewableObject(data);
                $scope.showContent = true;
            });
        }
    ]);