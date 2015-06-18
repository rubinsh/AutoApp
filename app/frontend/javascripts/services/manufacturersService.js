angular.module('autoServices')
    .factory('ManufacturersServices', ['$http',
        function($http) {
            var resource = {};

            resource.getAllManufacturers = function() {
                return $http.get(autoApiPrefix + 'manufacturers', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                });
            };

            resource.getAllModelsByManufacturerId = function(mId) {
                return $http.get(autoApiPrefix + 'manufacturers/' + mId + '/models', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                });
            };

            return resource;
        }
    ]);
