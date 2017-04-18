angular.module('autoControllers')
.controller('application', ['$rootScope','$scope', '$location', '$window', 'ArticlesServices', 'AdService',
            function($rootScope, $scope, $location, $window, ArticlesService, AdService) {
              $scope.showConsulting = false;
              $rootScope.showMainBanner = true;
              $rootScope.obslct = ".OUTBRAIN a"

              $scope.$on('$viewContentLoaded', function(event) {
                var pagePath = $location.path()
                if ($window.SharedObject) {
                  pagePath = pagePath || "";
                  pagePath += "/naitive-auto-app"
                }
                ga('set', { page: pagePath});
                ga('send', 'pageview');
              });

              $scope.digest = Date.now();

              $scope.navigate = function(path) {
                $location.path(path);
              };

              $scope.navigateNavBar = function(path) {
                $("button.navbar-toggle").click();
                $location.path(path);
              }

              $scope.showArticle = function(article) {
                ArticlesService.currentCategory = article.categoryId !== 0 ? article.categoryId : 1;
                $location.path("/articles/" + article.articleId);
              };

              $scope.isPhone = Modernizr.mq('(max-width: 767px)');

              $scope.showBanner = function() {
                return AdService.showBanner();
              }

              $scope.getBannerUrl = function(seed) {
                return AdService.getBannerUrl(seed);
              }

              $scope.getBigBannerUrl = function(seed) {
                return AdService.getBigBannerUrl(seed);
              }


              $scope.getMainBannerUrl = function(seed) {
                return AdService.getMainBannerUrl(seed);
              }

              function iOSversion() {
                if (/iP(hone|od|ad)/.test(navigator.platform)) {
                  var v = (navigator.appVersion).match(/OS (\d+).(\d+).?(\d+)?/);
                  return parseFloat(parseInt(v[1], 10) + "." + parseInt(v[2], 10) + "." + parseInt(v[3] || 0, 10));
                }
              }

              var version = iOSversion();
              $scope.modernIOS = version && version >= 8.2;
              $scope.isIOS6or5 = (/(iPhone|iPad|iPod)\sOS\s(5|6)/.test(navigator.userAgent));
              $scope.isIOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );


              $scope.goBack = function() {
                history.go(-1);
              }

            }
]);
