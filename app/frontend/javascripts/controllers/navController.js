angular.module('autoControllers')
    .controller('NavCtrl', ['$scope','$location', 'NavServices',
        function($scope, $location, NavServices) {
          $scope.navs = NavServices.navs;

          $scope.isActive = function(index) {
            if ($location.url() === $scope.navs[index].route) return "active";
          };

          $scope.navigate = function(route) {
            $location.path(route);
          };
        }
    ]);
