'use strict';
angular.module('autoControllers')
.controller('IndexCtrl', ['$scope', '$interval', '$templateCache', '$http','$q', '$timeout', '$location',
  'NavServices','CategoriesService','ArticlesServices', 'ManufacturersServices',
  function($scope, $interval, $templateCache, $http, $q, $timeout, $location, NavServices,CategoriesService,ArticlesServices, ManufacturersServices) {
    var stop;

    $scope.navs = NavServices.navs;
    $scope.currIndex = 0;
    $scope.disableModelsDropdown = true;
    $scope.modelsList = [];

    $timeout(function() {
      $('select').selectpicker();
      $('#maufacturer-select').on('change',function(event) {

        var manfId = $(this).find("option:selected").attr('data-manufacturer-id');
        $scope.disableModelsDropdown = true;
        $timeout(function() {
          $("#model-select").selectpicker('refresh');
        });
        ManufacturersServices.getAllModelsByManufacturerId(manfId).success(function(data) {
          $scope.modelsList =  data;
          $scope.disableModelsDropdown = false;
          $timeout(function() {
            $("#model-select").selectpicker('refresh');
          })
        });
      });

      $('#model-select').on('change',function(event) {
        var modelId = $(this).find("option:selected").attr('data-model-id');
        $location.path("/catalog/models/" + modelId);
        $scope.$apply();
      })
    });
    $scope.setIndex = function(index) {
      $scope.currIndex = index;
    };

    var convertToLargeImage = function(imageUrl) {
      return imageUrl.split(".jpg")[0]+"-4.jpg";
    };

    


    var articleServices = ArticlesServices;
    var getData = function() {
      var promises = [];
      promises.push(ArticlesServices.getAllArticlesForMainPage());
      promises.push(ManufacturersServices.getAllManufacturers());
      

      return $q.all(promises)
      .then(function(promiseResults) {
          var data = promiseResults[0];
          $scope.manufacturerList = promiseResults[1].data;
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