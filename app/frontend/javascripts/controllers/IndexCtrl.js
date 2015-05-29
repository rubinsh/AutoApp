'use strict';
angular.module('autoControllers')
.controller('IndexCtrl', ['$scope', '$interval', '$templateCache', '$http','$q', 'NavServices','CategoriesService','ArticlesServices',
  function($scope, $interval, $templateCache, $http, $q, NavServices,CategoriesService,ArticlesServices) {
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
    var getData = function() {

      return ArticlesServices.getAllArticles()
      .success(function(data) {
          var dicTypes = ArticlesServices.categories;

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
          $scope.articlesList = [];
          angular.forEach($scope.articlesCategoriesCollection, function(item, index) {
              $scope.articlesList.push(item);
          });
          $scope.articlesCategoriesList = null;
          $scope.mainArticle = $scope.articlesList[0].articles.shift();
          $scope.mainCategoryName = articleServices.categories[$scope.mainArticle.categoryId];
      });
      
    };

    getData().then(function() {
      $scope.latest=true;
    });
    

    

    
  }
]);