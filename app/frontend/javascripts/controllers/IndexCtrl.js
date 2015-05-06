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
      var promises = [];

      var res = ArticlesServices.getAllArticles()
      .success(function(data) {
          console.dir(data);

          $scope.articlesList = []
          angular.forEach(data, function(item, index) {
            $scope.articlesList.push(item);
          });
      });
      promises.push(res);
      
      
      res = CategoriesService.getCategories()
      .then(function(categories) {
        $http.get(autoApiPrefix + 'articles/latest?limit=4')
        .then(function(result) {
          var data = result.data;
          $scope.mainCategoryName = articleServices.categories[data[0].categoryId];
          angular.forEach(data, function(item, index) {
            data[index].thumbUrl = data[index].imageUrl;
            data[index].imageUrl = convertToLargeImage(data[index].imageUrl);
          });
          $scope.mainArticle = data.shift();
        });  
      });

      promises.push(res);
      return $q.all(promises);
    };

    getData().then(function() {
      $scope.latest=true;
    });
    

    

    
  }
]);