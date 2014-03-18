angular.module("main")
    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider
                .when('/articles', {
                    templateUrl: 'partials/allArticlesView.html',
                    controller: 'ArticleListCtrl'
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
                .when('/carcatalog/model/review', {
                    templateUrl: 'partials/modelReviewView.html',
                    controller: 'CarModelCtrl'
                })
                .when('/carcatalog/model/versions', {
                    templateUrl: 'partials/modelVersionsView.html',
                    controller: 'ModelVersionsCtrl'
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
                .when('/articles/:articleId', {
                    templateUrl: 'partials/articleView.html',
                    controller: 'ArticleCtrl'
                })
                .when('/articles/category/:categoryId', {
                    templateUrl: 'partials/allArticlesOfCategoryView.html',
                    controller: 'ArticlesCategoryCtrl'
                })
                .otherwise({
                    redirectTo: '/articles'
                });
        }
    ]);

angular.module("main").run(function($rootScope, $timeout) {
    $rootScope.$on('$routeChangeSuccess', function() {
        // $timeout(function() {
        $(document).foundation('reflow');
        console.log('$routeChangeSuccess');
        // }, 500);
    });
});