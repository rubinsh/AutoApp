angular.module('autoControllers')
  .controller('CarModelCtrl', ['$scope', '$location', '$routeParams', '$q', '$sce', '$filter', '$timeout', 'matchmedia', 'SearchServices',
    'CatalogServices', 'GalleryServices', 'VersionsServices', 'ModelVideosServices', 'ModelCompetitorsService',
    function($scope, $location, $routeParams, $q, $sce, $filter, $timeout, matchmedia, SearchServices,
      CatalogServices, GalleryServices, VersionsServices, ModelVideosServices, ModelCompetitorsService) {
      $scope.model_id = $routeParams.id;
      $scope.mako_url = $sce.trustAsResourceUrl("http://mobileapp.mako.co.il/metricsCall.html?vcmId=Auto_" + $scope.model_id + "&channelId=Auto&contentType=Auto_cars&platform=mobile");
      $scope.used_id = $routeParams.usedID;
      $scope.galleryVisible = false;
      // if (Modernizr.matchmedia) {
      var removeXXSListener = matchmedia.on('(max-width: 499px)', function(mediaQueryList) {
        $scope.isXXS = mediaQueryList.matches;
      });
      // }

      $scope.$on('$destroy', function() {
        // if (Modernizr.matchmedia) {
        removeXXSListener();
        //removeMDListener();
        // }
      });

      $scope.trustUrl = function(videoUrl) {
        return $sce.trustAsResourceUrl(videoUrl);
      };

      $scope.getCarModelPriceStr = function() {
        if (!$scope.model) {
          return "";
        }
        if (!$scope.model.MinPrice && !$scope.model.MaxPrice) {
          return $filter('number')(Number($scope.model.price), 0);
        }
        if ($scope.model.MinPrice == $scope.model.MaxPrice) {
          return $filter('number')($scope.model.MinPrice, 0);
        } else {
          if ($scope.model.MinPrice && $scope.model.MaxPrice) {
            return $filter('number')($scope.model.MaxPrice, 0) + " - " + $filter('number')($scope.model.MinPrice, 0);
          } else {
            if ($scope.model.MinPrice) {
              return $filter('number')($scope.model.MinPrice, 0);
            } else {
              return $filter('number')($scope.model.MaxPrice, 0);
            }
          }
        }
      }


      if ($scope.used_id) {
        //console.log("Route with -id- routeParams & usd_id routeParams");
        SearchServices.getModelUsedByUsedID($scope.model_id, $scope.used_id).success(function(data) {
          handleResults(data).then(function() {
            $scope.resultReady = true;
            $timeout(function() {
              window.scrollTo(0, 0);
            });
          });
        });
      } else {
        //console.log("Route with -id- routeParams");
        SearchServices.getSearchResaulForModelByModelId($scope.model_id).success(function(data) {
          handleResults(data).then(function() {
            $scope.resultReady = true;
            $timeout(function() {
              window.scrollTo(0, 0);
            });
          });
        });
      }

      function handleResults(data) {
        setDataFromService(data);
        var promises = [];
        promises.push(GalleryServices.getAllModelGalleryByGalleryId(data[0].galleryId).success(function(images) {
          angular.forEach(images, function(item, index) {
            var str = item.imageUrl;
            var imageId = str.split("_t/")[1].split("-")[0];
            item.imageUrl = "http://www.auto.co.il//modules/mpicture/server/imagethumb.ashx?i=" + imageId + "&w=390&h=250";

          });
          $scope.images = images;
          $scope.galleryVisible = true;
        }));
        promises.push(VersionsServices.getAllModelVersionsByModelId($scope.model_id).success(function(data) {
          $scope.versions = data;

        }));
        $scope.videos = false;
        promises.push(ModelVideosServices.getAllModelVideosByVideoId($scope.model.videoId).success(function(data) {
          if (data.length > 0) {
            $scope.videos = data;
          }
        }));
        $scope.competitors = false;
        promises.push(ModelCompetitorsService.getAllModelCompetitorsByCompetitorId($scope.model.competitorsId)
          .success(function(data) {
            if (data.length > 0) {
              $scope.competitors = data;
            }
          }));

        return $q.all(promises);
      }

      function pushIfNotEmpty(data, title, field) {
        if (typeof(data[0].review[field]) === 'string' && data[0].review[field].trim().length > 0) {
          $scope.reviews.push({
            title: title,
            content: data[0].review[field]
          });
        }
      };

      function setDataFromService(data) {
        $scope.reviews = [];
        $scope.model = data[0];
        $scope.model.hasSafetyStars = ($scope.model.safetyStars != "");
        $scope.model.consultingText = $scope.model.name.length > 10 ? "ליעוץ חינם על " + $scope.model.name : "לחץ כאן ליעוץ חינם על " + $scope.model.name;
        $scope.showArticles = ($scope.model.modelArticles && $scope.model.modelArticles.length > 0);
        if (data[0].review) {
          pushIfNotEmpty(data, 'חוות דעת', 'text');
          pushIfNotEmpty(data, 'עיצוב ונוכחות', 'design');
          pushIfNotEmpty(data, 'תא נוסעים ומטען', 'cabin');
          pushIfNotEmpty(data, 'מנוע וביצועים', 'performance');
          pushIfNotEmpty(data, 'תא נוסעים ומטען', 'cabin');
          pushIfNotEmpty(data, 'נוחות והתנהגות', 'comfort');
          pushIfNotEmpty(data, 'תמורה למחיר', 'valueForMoney');
          pushIfNotEmpty(data, 'סיכום', 'summary');
          pushIfNotEmpty(data, 'יתרונות', 'advantages');
          pushIfNotEmpty(data, 'חסרונות', 'disadvantages');
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
