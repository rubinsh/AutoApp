angular.module('autoServices')
.factory('VersionsServices', ['$http',
         function($http) {
           var resource = {};

           resource.getAllModelVersionsByModelId = function(modelId) {
             return $http.get(autoApiPrefix + 'models/' + modelId + '/versions', {
               headers: {
                 'Accept': 'application/json',
                 'Content-type': 'application/json'
               }
             });
           };

           resource.getAllModelUsedsByModelIDAndUsedID = function(modelID, usedID) {
             return $http.get(autoApiPrefix + 'models/' + modelID + '/usedID.json', {
               headers: {
                 'Content-type': 'application/json'
               },
               params: {
                 model_id: modelID,
                 used_id: usedID
               }
             });
           };

           resource.getModelVersionDetailsByModelIDAndVersionID = function(modelID, versionID) {
             return $http.get(autoApiPrefix + 'models/' + modelID + '/versions/' + versionID + '/', {
               headers: {
                 'Accept': 'application/json',
                 'Content-type': 'application/json'
               }
             });
           };

           return resource;
         }
]);
