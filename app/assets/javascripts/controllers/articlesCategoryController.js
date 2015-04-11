angular.module('autoControllers')
.controller('ArticlesCategoryCtrl', ['$scope', '$routeParams', '$location', 'ArticlesServices',
            function($scope, $routeParams, $location, ArticlesServices) {
              $scope.categoryId = $routeParams.categoryId;
              $scope.categoryName = ArticlesServices.categories[$scope.categoryId];
              $scope.busy = false;
              $scope.empty = true;
              $scope.hasdata = true;
              skip = 10;

              ArticlesServices.getAllArticlesByCatregoryId($scope.categoryId).success(function(data) {
                $scope.articles = data;
              });

              $scope.getBigImage = function(imageUrl) {
                var name = imageUrl.split('.jpg')[0];
                return imageUrl;
              };

              $scope.addMoreArticles = function() {
                if (!$scope.busy) {
                  if (skip <= 100) {
                    console.debug('adding more items...');
                    $scope.busy = true;
                    ArticlesServices.getMoreArticlesForCategory($scope.categoryId, skip).success(function(data) {
                      if ($scope.articles) {
                        $scope.articles.push.apply($scope.articles, data);
                        skip += 10;
                        $scope.busy = false;
                      }
                    });
                  } else {
                    //TODO: send event to 'infinityscrollDirective' to remove window binding to 'scroll' event....
                    $scope.hasdata = false;
                  }
                }
              };


            }

]);
