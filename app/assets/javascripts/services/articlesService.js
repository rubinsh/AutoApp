angular.module('autoServices')
.factory('ArticlesServices', ['$http',
         function($http) {
           var resource = {};

           resource.categories = {
             "1": 'חדשות הרכב',
             "2": 'מבחני רכב',
             "3": 'שטח',
             "4": 'ירוק',
             "5": 'ספורט מוטורי',
             "6": 'מגזין ודעות'
           };

           resource.getAllArticles = function() {
             return $http.get(autoApiPrefix + 'articles');
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
