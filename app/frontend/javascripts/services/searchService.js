angular.module('autoServices')
.factory('SearchServices', ['$http',
         function($http) {
           var resource = {};

           resource.getSearchResaulForAllManufacturerModels = function(manufacturerId) {
             return $http.get(autoApiPrefix + 'search?manufacturer=' + manufacturerId , {
               headers: {
                 'Accept': 'application/json',
                 'Content-type': 'application/json'
               }
             });
           };

           resource.getModelInfo = function(modelId) {
             return $http.get(autoApiPrefix + 'models/' + modelId , {
               headers: {
                 'Accept': 'application/json',
                 'Content-type': 'application/json'
               }
             });
           };

           resource.getModelUsedByUsedID = function(modelId, usedId) {
             return $http.get(autoApiPrefix + 'models/' + modelId + '/used/' + usedId, {
               headers: {
                 'Accept': 'application/json',
                 'Content-type': 'application/json'
               }
             });
           };

           return resource;
         }
]);
