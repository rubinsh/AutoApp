angular.module("main")
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/articles/latest', {
                    templateUrl: 'index',
                    reloadOnSearch: false
                })
                .when('/catalog', {
                    templateUrl: 'catalogView'
                })
                .when('/catalog/manufacturers', {
                    templateUrl: 'manufacturersView'
                })
                .when('/catalog/manufacturers/:id', {
                    templateUrl: 'allManufacturerModelsView'
                })
                .when('/catalog/manufacturers/:id/models/:id', {
                    templateUrl: 'carModelView'
                })
                .when('/catalog/manufacturers/:id/models', {
                    templateUrl: 'modelsView'
                })
                .when('/catalog/models/:id', {
                    templateUrl: 'carModelView'
                })
                .when('/catalog/models/:id/used', {
                    templateUrl: 'carModelView'
                })
                .when('/catalog/model/review/:id', {
                    templateUrl: 'modelReviewView'
                })
                .when('/catalog/model/versions/:id', {
                    templateUrl: 'modelVersionsView'
                })
                .when('/catalog/model/versions/', {
                    templateUrl: 'modelVersionsView'
                })
                .when('/catalog/model/version/details/', {
                    templateUrl: 'modelVersionDetailsView'
                })
                .when('/catalog/model/gallery/:id', {
                    templateUrl: 'modelGalleryView'
                })
                .when('/catalog/model/videos/:id', {
                    templateUrl: 'modelVideosView'
                })
                .when('/catalog/model/competitors/:id', {
                    templateUrl: 'modelCompetitorsView'
                })
                .when('/catalog/models/:id/useds', {
                    templateUrl: 'modelUsedsView'
                })
                .when('/articles', {
                    templateUrl:'ArticlesListView'
                })
                .when('/articles/:articleId', {
                    templateUrl: 'articleView'
                })
                .when('/articles/category/:categoryId', {
                    templateUrl: 'allArticlesOfCategoryView'
                })
                .when('/guide', {
                    templateUrl: 'buyingGuideView'
                })
                .when('/guide/search', {
                    templateUrl: 'guideSearchResultView'
                })
                .when('/articles', {
                    templateUrl: 'articlesListView'
                })
                .when('/consulting', {
                    templateUrl: 'consultingView'
                })
                .otherwise({
                    redirectTo: '/articles/latest'
                });
        }
    ])
    .run(["$rootScope", "$route", "AdService", function($rootScope, $route, AdService) {
      //handle ads - show ad every 3 screens in selected routes
      var paths = ['/catalog/manufacturers/:id/models/:id','/catalog/models/:id','/articles/latest','/articles/:articleId']
      AdService.init();
      $rootScope.$on('$routeChangeSuccess', function() {
        if ($route.current && $route.current.$$route && $.inArray($route.current.$$route.originalPath, paths) > -1) {
          if (AdService.needToShowAd()) {
            AdService.showAd();
          }
          AdService.advanceCounter();
        }
      });
    }]);
