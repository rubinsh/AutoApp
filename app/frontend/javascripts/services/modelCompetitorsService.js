angular.module('autoServices')
.factory('ModelCompetitorsService', ['$http',
         function($http) {
           var source = {};

           source.getAllModelCompetitorsByCompetitorId = function(competitor_id) {
             return $http.get(autoApiPrefix + 'competitors/' + competitor_id + '/10', {
               headers: {
                 'Accept': 'application/json',
                 'Content-type': 'application/json'
               }
             });
           };

           return source;
         }
]);
