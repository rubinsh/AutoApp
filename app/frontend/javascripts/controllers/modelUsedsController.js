angular.module('autoControllers')
    .controller('ModelUsedsCtrl', ['$scope', '$routeParams', 'ModelUsedsServices',
        function($scope, $routeParams, ModelUsedsServices) {
            var modelID = $routeParams.id;
            var newOrUsed = $routeParams.new;

            if (modelID) {
                console.log('model id : ' + modelID);
                ModelUsedsServices.getAllModelUsedsByModelID(modelID).success(function(data) {
                    $scope.usedsModels = data;

                    console.log(data);
                });
            }
        }
    ]);
