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
                      item.imageUrl = "http://www.auto.co.il//modules/mpicture/server/imagethumb.ashx?i=" + imageId + "&w=390&h=250";

                    });
                    $scope.images = images;

                    $scope.galleryVisible = true;
                  });
                });
              }

              function pushIfNotEmpty(data, title, field) {
                if (typeof(data[0].review[field]) === 'string' && data[0].review[field].trim().length > 0 ) {
                  $scope.reviews.push({
                    title: title,
                    content: data[0].review[field]
                  });  
                }
              };

              function setDataFromService(data) {
                $scope.reviews = [];
                $scope.model = data[0];
                $scope.model.consultingText = $scope.model.name.length > 10 ? "ליעוץ חינם על " + $scope.model.name : "לחץ כאן ליעוץ חינם על " + $scope.model.name; 
                if (data[0].review) {
                  pushIfNotEmpty(data,'חוות דעת','text');
                  pushIfNotEmpty(data,'עיצוב ונוכחות','design');
                  pushIfNotEmpty(data,'תא נוסעים ומטען','cabin');
                  pushIfNotEmpty(data,'מנוע וביצועים','performance');
                  pushIfNotEmpty(data,'תא נוסעים ומטען','cabin');
                  pushIfNotEmpty(data,'נוחות והתנהגות','comfort');
                  pushIfNotEmpty(data,'תמורה למחיר','valueForMoney');
                  pushIfNotEmpty(data,'סיכום','summary');
                  pushIfNotEmpty(data,'יתרונות','advantages');
                  pushIfNotEmpty(data,'חסרונות','disadvantages');
                }

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
