angular.module('autoServices')
.factory('GalleryServices', ['$http',
         function($http) {
           var resource = {};

           resource.getAllModelGalleryByGalleryId = function(galleryId) {
             return $http.get(autoApiPrefix + 'galleries/' + galleryId, {
               headers: {
                 'Accept': 'application/json',
                 'Content-type': 'application/json'
               }
             });
           };

           return resource;
         }
]);
