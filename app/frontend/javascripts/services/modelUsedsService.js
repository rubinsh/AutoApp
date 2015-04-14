angular.module('autoServices')
.factory('ModelUsedsServices', ['$http',
         function($http) {
           var source = {};

           source.getAllModelUsedsByModelID = function(model_id) {
             return $http.get(autoApiPrefix + 'models/' + model_id + '/used', {
               headers: {
                 'Accept': 'application/json',
                 'Content-type': 'application/json'
               }
             });
           };

           source.getAllModelUsedsByModelIDAndUsedID = function(modelID, usedID) {
             return $http.get(autoApiPrefix + 'models/' + modelID + '/used/' + usedID, {
               headers: {
                 'Accept': 'application/json',
                 'Content-type': 'application/json'
               }
             });
           };

           return source;
         }
]);
