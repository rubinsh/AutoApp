angular.module('autoControllers')
    .controller('LeasingCtrl', ['$scope', '$timeout', '$sce', 'ArticlesServices',
        function($scope, $timeout, $sce, ArticlesServices) {
            $scope.article = true; //workaround for the more-articles directive
        }
    ]);
