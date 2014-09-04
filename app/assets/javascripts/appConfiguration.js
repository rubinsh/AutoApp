angular.module("main")
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/articles/latest', {
                    templateUrl: 'templates/index',
                    reloadOnSearch: false
                })
                .when('/catalog', {
                    templateUrl: 'templates/catalogView'
                })
                .when('/catalog/manufacturers', {
                    templateUrl: 'templates/manufacturersView'
                })
                .when('/catalog/manufacturers/:id', {
                    templateUrl: 'templates/allManufacturerModelsView'
                })
                .when('/catalog/manufacturers/:id/models/:id', {
                    templateUrl: 'templates/carModelView'
                })
                .when('/catalog/manufacturers/:id/models', {
                    templateUrl: 'templates/modelsView'
                })
                .when('/catalog/models/:id', {
                    templateUrl: 'templates/carModelView'
                })
                .when('/catalog/models/:id/used', {
                    templateUrl: 'templates/carModelView'
                })
                .when('/catalog/model/review/:id', {
                    templateUrl: 'templates/modelReviewView'
                })
                .when('/catalog/model/versions/:id', {
                    templateUrl: 'templates/modelVersionsView'
                })
                .when('/catalog/model/versions/', {
                    templateUrl: 'templates/modelVersionsView'
                })
                .when('/catalog/model/version/details/', {
                    templateUrl: 'templates/modelVersionDetailsView'
                })
                .when('/catalog/model/gallery/:id', {
                    templateUrl: 'templates/modelGalleryView'
                })
                .when('/catalog/model/videos/:id', {
                    templateUrl: 'templates/modelVideosView'
                })
                .when('/catalog/model/competitors/:id', {
                    templateUrl: 'templates/modelCompetitorsView'
                })
                .when('/catalog/models/:id/useds', {
                    templateUrl: 'templates/modelUsedsView'
                })
                .when('/articles', {
                    templateUrl:'templates/ArticlesListView'
                })
                .when('/articles/:articleId', {
                    templateUrl: 'templates/articleView'
                })
                .when('/articles/category/:categoryId', {
                    templateUrl: 'templates/allArticlesOfCategoryView'
                })
                .when('/guide', {
                    templateUrl: 'templates/buyingGuideView'
                })
                .when('/guide/search', {
                    templateUrl: 'templates/guideSearchResultView'
                })
                .when('/articles', {
                    templateUrl: 'templates/articlesListView'
                })
                .when('/consulting', {
                    templateUrl: 'templates/consultingView'
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
        //if (AdService.backFromAd())  {
        //  console.debug("back from Ad");
        //  AdService.reset();
        //  AdService.advanceCounter();
        //  return;
        //}
        if ($route.current && $route.current.$$route && $.inArray($route.current.$$route.originalPath, paths) > -1) {
          if (AdService.needToShowAd()) {
            AdService.showAd();
          }
          AdService.advanceCounter();
        }
      });
    }]);
