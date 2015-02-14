angular.module('autoControllers')
    .controller('ArticleListCtrl', ['$scope', '$timeout', '$location', 'NavServices', 'ArticlesServices',
        function($scope, $timeout, $location, NavServices, ArticlesServices ) {
            var dicTypes = ArticlesServices.categories;

            $scope.getBigImage = function(imageUrl) {
              var name = imageUrl.split('.jpg')[0];
              return name + "-4.jpg";
            };

            ArticlesServices.getAllArticles().success(function(data) {
                $scope.articlesCategoriesCollection = {};
                angular.forEach(dicTypes, function(item, key) {
                    $scope.articlesCategoriesCollection[key] = {
                        categoryName: item,
                        categoryId: key,
                        articles: []
                    };
                });
                angular.forEach(data, function(item, index) {
                    $scope.articlesCategoriesCollection[item.categoryId].articles.push(item);
                });
                $scope.articlesList = []
                angular.forEach($scope.articlesCategoriesCollection, function(item, index) {
                  $scope.articlesList.push(item);
                });
                $scope.articlesCategoriesList = null;
            });
        }
    ]);
