angular.module('autoServices')
.factory('ArticlesServices', ['$http',
         function($http) {
           var resource = {};

           resource.categories = {
             "74": 'חדשות הרכב',
             "75": 'מבחני רכב',
             "76": 'שטח',
             "1294": 'ירוק',
             "1297": 'ספורט מוטורי',
             "1374": 'מגזין ודעות'
           };

           resource.getAllArticles = function() {
             return $http.get(autoApiPrefix + 'articles/grouped?categories=74,75,76,1294,1297,1374&groupcount=3');
           };

           resource.getAllArticlesByCatregoryId = function(categoryId, count) {
             if (typeof(count) === "undefined") {
               count = 10;
             }
             return $http.get(autoApiPrefix + 'articles?category=' + categoryId + "&count=" + count);
           };

           resource.getArticleById = function(articleId) {
             return $http.get(autoApiPrefix + 'articles/' + articleId + '?links=true');
             //return Restangular.one('articles', articleId).get({links: true});
           };

           return resource;
         }
]);
