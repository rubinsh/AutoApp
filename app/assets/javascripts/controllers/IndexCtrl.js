angular.module('autoControllers')
.controller('IndexCtrl', ['$scope', '$interval', '$templateCache', 'Restangular', 'NavServices',
            function($scope, $interval, $templateCache, Restangular, NavServices) {
              var stop;
              $scope.navs = NavServices.navs;
              $scope.currIndex = 0;
              //stop = $interval(function() {
                //$scope.currIndex++;
                //$scope.currIndex = $scope.currIndex % ($scope.latest.length);
              //},6000);

              //$scope.stopCarousel = function() {
                //if (angular.isDefined(stop)) {
                  //$interval.cancel(stop);
                  //stop = undefined;
                //}
              //};

              $scope.setIndex = function(index) {
                //$scope.stopCarousel();
                $scope.currIndex = index;
              };

              //$scope.$on("$destroy", function() {
                //$scope.stopCarousel();
              //});

              var convertToLargeImage = function(imageUrl) {
                return imageUrl.split(".jpg")[0]+"-4.jpg";
              };

              Restangular.all('articles').customGET('latest').then(function(data) {
                angular.forEach(data, function(item, index) {
                  data[index].thumbUrl = data[index].imageUrl;
                  data[index].imageUrl = convertToLargeImage(data[index].imageUrl);
                });
                $scope.latest = data;
              });
            }
]);
