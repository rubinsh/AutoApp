angular.module('autoServices')
    .factory('CategoriesService', ['$http','$q',
        function($http,$q) {
            resource = {};
            categroyList = [];
            
            resource.getCategories = function() {
                var deferred = $q.defer();
                if (categroyList.length === 0) {
                    $http.get(autoApiPrefix + 'categories')
                    .then(function (result) {
                        categroyList = result.data;
                        deferred.resolve(categroyList);
                    });
                }
                else {
                    console.log('not empty');
                    deferred.resolve(categroyList);
                }
                return deferred.promise;
            };

            return resource;
        }
    ]);
