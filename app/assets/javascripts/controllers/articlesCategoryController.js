angular.module('autoControllers')
.controller('ArticlesCategoryCtrl', ['$scope', '$routeParams', '$location', 'ArticlesServices',
            function($scope, $routeParams, $location, ArticlesServices) {
              $scope.categoryId = $routeParams.categoryId;
              $scope.categoryName = ArticlesServices.categories[$scope.categoryId];

              ArticlesServices.getAllArticlesByCatregoryId($scope.categoryId).success(function(data) {
                $scope.articles = data;
              });

              $scope.getBigImage = function(imageUrl) {
                var name = imageUrl.split('.jpg')[0];
                return imageUrl;
              };

            }
]);
