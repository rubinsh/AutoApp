angular.module('autoControllers')
.controller('application', ['$scope', '$location', 'ArticlesServices', 'AdService',
            function($scope, $location, ArticlesService, AdService) {

              $scope.$on('$viewContentLoaded', function(event) {
                ga('set', { page: $location.path()});
                ga('send', 'pageview');
              });

              $scope.navigate = function(path) {
                $location.path(path);
              };

              $scope.showArticle = function(article) {
                ArticlesService.currentCategory = article.categoryId !== 0 ? article.categoryId : 1;
                $location.path("/articles/" + article.articleId);
              };

              $scope.isPhone = Modernizr.mq('(max-width: 767px)');

              $scope.showBanner = function() {
                return AdService.showBanner();
              }

              $scope.isIOS6or5 = (/(iPhone|iPad|iPod)\sOS\s(5|6)/.test(navigator.userAgent));
              $scope.isIOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );

              $scope.goBack = function() {
                history.go(-1);
              }
            }
]);
