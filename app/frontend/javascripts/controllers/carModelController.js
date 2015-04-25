angular.module('autoControllers')
.controller('CarModelCtrl', ['$scope', '$location', '$routeParams', '$sce', 'matchmedia', 'SearchServices', 'CatalogServices', 'GalleryServices',
            function($scope, $location, $routeParams, $sce, matchmedia, SearchServices, CatalogServices, GalleryServices) {
              $scope.model_id = $routeParams.id;
              $scope.mako_url = $sce.trustAsResourceUrl("http://mobileapp.mako.co.il/metricsCall.html?vcmId=Auto_" + $scope.model_id + "&channelId=Auto&contentType=Auto_cars&platform=mobile");
              $scope.used_id = $routeParams.usedID;
              $scope.galleryVisible = false;
              // if (Modernizr.matchmedia) {
                var removeXXSListener = matchmedia.on('(max-width: 499px)', function(mediaQueryList){
                  $scope.isXXS = mediaQueryList.matches;
                });
              // }

              $scope.$on('$destroy', function() {
                // if (Modernizr.matchmedia) {
                  removeXXSListener();
                  //removeMDListener();
                // }
              });

              if ($scope.used_id) {
                //console.log("Route with -id- routeParams & usd_id routeParams");
                SearchServices.getModelUsedByUsedID($scope.model_id, $scope.used_id).success(function(data) {
                  setDataFromService(data);
                });
              } else {
                //console.log("Route with -id- routeParams");
                SearchServices.getSearchResaulForModelByModelId($scope.model_id).success(function(data) {
                  setDataFromService(data);
                  GalleryServices.getAllModelGalleryByGalleryId(data[0].galleryId).success(function(images) {
                    //var buildChunks = function(array, chunkSize) {
                    //var arrayBck = angular.copy(array);
                    //$scope['images' + chunkSize] = [];
                    //while (images.length > 0) {
                    //$scope['images' + chunkSize].push(images.splice(0,chunkSize));
                    //}
                    //images = arrayBck;
                    //};
                    //buildChunks(images,1);
                    //buildChunks(images,2);
                    //buildChunks(images,3);
                    angular.forEach(images, function(item, index) {
                      var str = item.imageUrl;
                      var imageId = str.split("_t/")[1].split("-")[0];
                      item.imageUrl = "http://www.auto.co.il//modules/mpicture/server/imagethumb.ashx?i=" + imageId + "&w=500&h=10000";

                    });
                    $scope.images = images;

                    $scope.galleryVisible = true;
                  });
                });
              }

              function setDataFromService(data) {
                $scope.reviews = [];
                $scope.model = data[0];

                $scope.reviews.push({
                  title: 'חוות דעת',
                  content: data[0].review.text
                });
                $scope.reviews.push({
                  title: 'עיצוב ונוכחות',
                  content: data[0].review.design
                });
                $scope.reviews.push({
                  title: 'תא נוסעים ומטען',
                  content: data[0].review.cabin
                });
                $scope.reviews.push({
                  title: 'מנוע וביצועים',
                  content: data[0].review.performance
                });
                $scope.reviews.push({
                  title: 'נוחות והתנהגות',
                  content: data[0].review.comfort
                });
                $scope.reviews.push({
                  title: 'תמורה למחיר',
                  content: data[0].review.valueForMoney
                });
                $scope.reviews.push({
                  title: 'סיכום',
                  content: data[0].review.summary
                });
                $scope.reviews.push({
                  title: 'יתרונות',
                  content: data[0].review.advantages
                });
                $scope.reviews.push({
                  title: 'חסרונות',
                  content: data[0].review.disadvantages
                });

                $scope.tableData = [{
                  title: 'חוות דעת מומחה',
                  link: '/catalog/model/review/' + $scope.model.id
                }, {
                  title: 'גרסאות',
                  link: '/catalog/model/versions/' + $scope.model.id
                }, {
                  title: 'תמונות גלריה',
                  link: '/catalog/model/gallery/' + $scope.model.galleryId
                }, {
                  title: 'וידאו',
                  link: '/catalog/model/videos/' + $scope.model.videoId
                }, {
                  title: 'מתחרים',
                  link: '/catalog/model/competitors/' + $scope.model.competitorsId
                }, {
                  title: 'דגמי יד שניה',
                  link: '/catalog/models/' + $scope.model.id + '/useds'
                }];

              }
            }
]);
