angular.module('autoControllers')
.controller('CompareResultController', ['$scope', '$timeout', '$routeParams', '$q', 'VersionsServices',
  function($scope, $timeout, $routeParams, $q, VersionsServices) {
  	$scope.model1Id = $routeParams.model1Id;
  	$scope.model2Id = $routeParams.model2Id;
  	$scope.version1Id = $routeParams.version1Id;
  	$scope.version2Id = $routeParams.version2Id;
    $scope.model1Image = decodeURIComponent($routeParams.model1ImageUrl);
    $scope.model2Image = decodeURIComponent($routeParams.model2ImageUrl);
  	$scope.showContent = false;
  	// console.log($routeParams);

		var promise1 = VersionsServices.getModelVersionDetailsByModelIDAndVersionID($scope.model1Id,$scope.version1Id)
    .then(function(results) {
    	$scope.name1 = results.data[0].name;
      $scope.versionDetails1 = VersionsServices.convertVersionDetailsToViewableObject(results.data);
    });

    var promise2 = VersionsServices.getModelVersionDetailsByModelIDAndVersionID($scope.model2Id,$scope.version2Id)
    .then(function(results) {
    	$scope.name2 = results.data[0].name;
      $scope.versionDetails2 = VersionsServices.convertVersionDetailsToViewableObject(results.data);
    });

    $q.all([promise1,promise2]).then(function() {
    	$scope.showContent = true;
    	// console.dir($scope.versionDetails2);
      $timeout(function() {
        $scope.specialHeader = new Headhesive('#result-header',{offset: 50});  
      });
    }); 

    $scope.$on('$destroy', function() {
      $scope.specialHeader.destroy();
    });
}]);