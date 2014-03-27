angular.module("main")
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/articles', {
                    templateUrl: 'partials/ArticlesListView.html',
                    controller: 'ArticleListCtrl'
                })
                .when('/articles/latest', {
                    templateUrl: 'partials/Index.html',
                    controller: 'IndexCtrl'
                })
                .when('/articles/carcatalog', {
                    templateUrl: 'partials/catalogView.html',
                    controller: 'CatalogCtrl'
                })
                .when('/articles/carcatalog/manufacturers', {
                    templateUrl: 'partials/manufacturersView.html',
                    controller: 'ManufacturersCtrl'
                })
                .when('/articles/carcatalog/manufacturers/:id', {
                    templateUrl: 'partials/allManufacturerModelsView.html',
                    controller: 'AllManufacturerModelsCtrl'
                })
                .when('/articles/carcatalog/manufacturers/:id/models/:id', {
                    templateUrl: 'partials/carModelView.html',
                    controller: 'CarModelCtrl'
                })
                .when('/articles/carcatalog/models', {
                    templateUrl: 'partials/modelsView.html',
                    controller: 'ModelsCtrl'
                })
                .when('/articles/carcatalog/models/:id', {
                    templateUrl: 'partials/carModelView.html',
                    controller: 'CarModelCtrl'
                })
                .when('/articles/carcatalog/models/:id/used', {
                    templateUrl: 'partials/carModelView.html',
                    controller: 'CarModelCtrl'
                })
                .when('/carcatalog/model/review/:id', {
                    templateUrl: 'partials/modelReviewView.html',
                    controller: 'CarModelCtrl'
                })
                .when('/carcatalog/model/versions/:id', {
                    templateUrl: 'partials/modelVersionsView.html',
                    controller: 'ModelVersionsCtrl'
                })
                .when('/carcatalog/model/versions/', {
                    templateUrl: 'partials/modelVersionsView.html',
                    controller: 'ModelVersionsCtrl'
                })
                .when('/carcatalog/model/version/details/', {
                    templateUrl: 'partials/modelVersionDetailsView.html',
                    controller: 'ModelVersionDetailsCtrl'
                })
                .when('/carcatalog/model/gallery', {
                    templateUrl: 'partials/modelGalleryView.html',
                    controller: 'ModelGalleryCtrl'
                })
                .when('/carcatalog/model/videos', {
                    templateUrl: 'partials/modelVideosView.html',
                    controller: 'ModelVideosCtrl'
                })
                .when('/carcatalog/model/competitors', {
                    templateUrl: 'partials/modelCompetitorsView.html',
                    controller: 'ModelCompetitorsCtrl'
                })
                .when('/carcatalog/models/:id/useds', {
                    templateUrl: 'partials/modelUsedsView.html',
                    controller: 'ModelUsedsCtrl'
                })
                .when('/articles/:articleId', {
                    templateUrl: 'partials/articleView.html',
                    controller: 'ArticleCtrl'
                })
                .when('/articles/category/:categoryId', {
                    templateUrl: 'partials/allArticlesOfCategoryView.html',
                    controller: 'ArticlesCategoryCtrl'
                })
                .when('/guide', {
                    templateUrl: 'partials/buyingGuideView.html',
                    controller: 'BuyingGuideCtrl'
                })
                .when('/guide/search', {
                    templateUrl: 'partials/guideSearchResultView.html',
                    controller: 'GuideSearchResultCtrl'
                })
                .when('/articles', {
                    templateUrl: 'partials/articlesListView.html',
                    controller: 'ArticleListCtrl'
                })
                .otherwise({
                    redirectTo: '/articles/latest'
                });
        }
    ]);

angular.module("main").run(function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function() {
        //$(document).foundation('reflow');
        console.log('$routeChangeSuccess');
    });
});