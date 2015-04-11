angular.module('autoControllers')
.controller('ModelGalleryCtrl', ['$scope', '$routeParams', 'matchmedia', 'GalleryServices',
            function($scope, $routeParams, matchmedia, GalleryServices) {
              $scope.gallery_id = $routeParams.id;
              $scope.doubleGallery = [];
              $scope.bigGallery = [];

              if (Modernizr.matchmedia) {
                var unregister = matchmedia.onPhone( function(mediaQueryList){
                  $scope.isPhone = mediaQueryList.matches;
                });
              }

              if ($scope.gallery_id) {
                GalleryServices.getAllModelGalleryByGalleryId($scope.gallery_id)
                .success(function(data) {
                  //add the big image url to each item
                  angular.forEach(data, function(item, index) {
                    var str = item.imageUrl;
                    var imageId = str.split("_t/")[1].split("-")[0];
                    item.imageUrl = "http://www.auto.co.il//modules/mpicture/server/imagethumb.ashx?i=" + imageId + "&w=500&h=10000";
                    item.bigImageUrl = "http://www.auto.co.il//modules/mpicture/server/imagethumb.ashx?i=" + imageId + "&w=1024&h=10000";
                    //item.bigImageUrl = str.split("_t/")[0] + str.split("_t/")[1].split("-")[0]+".jpg";
                  });

                  angular.forEach(data, function(item, index) {
                    if (index % 2 === 0) {
                      var items = {
                        item1: data[index],
                        item2: (index < data.length -1) ? data[index+1] : { imageUrl: "", bigImageUrl: "" }
                      };
                      $scope.doubleGallery.push(items);
                    }
                  });
                  $scope.gallery = data;
                });
              }

            }

]);
