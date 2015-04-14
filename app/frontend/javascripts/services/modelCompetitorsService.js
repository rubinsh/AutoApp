angular.module('autoServices')
.factory('ModelCompetitorsServices', ['$http',
         function($http) {
           var source = {};

           source.getAllModelCompetitorsByCompetitorId = function(competitor_id) {
             return $http.get(autoApiPrefix + 'competitors/' + competitor_id, {
               headers: {
                 'Accept': 'application/json',
                 'Content-type': 'application/json'
               }
             });
           };

           return source;
         }
]);
