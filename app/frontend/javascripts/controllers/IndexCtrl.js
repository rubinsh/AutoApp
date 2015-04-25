'use strict';
angular.module('autoControllers')
.controller('IndexCtrl', ['$scope', '$interval', '$templateCache', '$http', 'NavServices','CategoriesService','ArticlesServices',
  function($scope, $interval, $templateCache, $http, NavServices,CategoriesService,ArticlesServices) {
    var stop;

    $scope.navs = NavServices.navs;
    $scope.currIndex = 0;
    $scope.setIndex = function(index) {
      $scope.currIndex = index;
    };


    var convertToLargeImage = function(imageUrl) {
      return imageUrl.split(".jpg")[0]+"-4.jpg";
    };

    var articleServices = ArticlesServices;

    ArticlesServices.getAllArticles().success(function(data) {
        $scope.articlesCategoriesCollection = {};
        angular.forEach(ArticlesServices.categories, function(item, key) {
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
    }).then(function() {
      CategoriesService.getCategories()
      .then(function(categories) {
        console.log(categories);
        $http.get(autoApiPrefix + 'articles/latest?limit=4')
        .then(function(result) {
          var data = result.data;
          $scope.mainCategoryName = articleServices.categories[data[0].categoryId];
          angular.forEach(data, function(item, index) {
            data[index].thumbUrl = data[index].imageUrl;
            data[index].imageUrl = convertToLargeImage(data[index].imageUrl);
          });
          $scope.mainArticle = data.shift();
          $scope.latest = data;
        });  
      });  
    });

    

    
  }
]);