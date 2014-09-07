angular.module('autoServices')
    .factory('ManufacturersServices', ['$http',
        function($http) {
            var resourcemf = {};

            resourcemf.getAllManufacturers = function() {
                return $http.get(autoApiPrefix + 'manufacturers', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                });
            };

            resourcemf.getAllModelsByManufacturerId = function(mId) {
                return $http.get(autoApiPrefix + 'manufacturers/' + mId + '/models', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                });
            };

            return resourcemf;
        }
    ]);
