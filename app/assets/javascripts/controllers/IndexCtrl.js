angular.module('autoControllers')
.controller('IndexCtrl', ['$scope', '$interval', '$templateCache', '$http', 'NavServices',
            function($scope, $interval, $templateCache, $http, NavServices) {
              var stop;
              $scope.navs = NavServices.navs;
              $scope.currIndex = 0;
              $scope.setIndex = function(index) {
                $scope.currIndex = index;
              };


              var convertToLargeImage = function(imageUrl) {
                return imageUrl.split(".jpg")[0]+"-4.jpg";
              };

              $http.get(autoApiPrefix + 'articles/latest?limit=6').success(function(data) {
                angular.forEach(data, function(item, index) {
                  data[index].thumbUrl = data[index].imageUrl;
                  data[index].imageUrl = convertToLargeImage(data[index].imageUrl);
                });
                $scope.latest = data;
              });
            }
]);
