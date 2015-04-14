angular.module('autoControllers')
    .controller('ModelVideosCtrl', ['$scope', '$routeParams', '$sce', '$timeout', 'ModelVideosServices',
        function($scope, $routeParams, $sce, $timeout, ModelVideosServices) {
            $scope.switchView = false;
            $scope.defaultVideoText = '';
            $scope.videoUrl = '';

            $scope.trustUrl = function(videoUrl) {
               return $sce.trustAsResourceUrl(videoUrl);
            };

            ModelVideosServices.getAllModelVideosByVideoId($routeParams.id).success(function(data) {
                $scope.videos = data;
                if ($scope.videos.length === 0) {
                    $scope.defaultVideoText = 'לא קיימים סרטי וידאו לדגם זה';
                }
                $timeout(function() { window.scrollTo(0,0); });
            });
        }
    ]);
