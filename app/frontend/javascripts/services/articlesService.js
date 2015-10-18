angular.module('autoServices')
.factory('ArticlesServices', ['$http', '$q',
  function($http,$q) {
    var resource = {};

    resource.categories = {
      "74": 'חדשות רכב',
      "75": 'מבחני רכב',
      "76": 'שטח',
      "1294": 'ירוק',
      "1297": 'ספורט מוטורי',
      "1374": 'מגזין ודעות'
    };

    resource.getAllArticles = function() {
      return $http.get(autoApiPrefix + 'articles/grouped?categories=74,75,76,1294,1297,1374&groupcount=3');
    };

    resource.getAllArticlesForMainPage = function() {
      var deferred = $q.defer();
      promise1 = $http.get(autoApiPrefix + 'articles/grouped?categories=75,76,1294,1297,1374&groupcount=3');
      promise2 = $http.get(autoApiPrefix + 'articles/grouped?categories=74&groupcount=6');
      
      $q.all([promise1,promise2]).then(function(promises) {
        deferred.resolve(promises[1].data.concat(promises[0].data));
      });

      return deferred.promise;
    };

    resource.getAllArticlesByCatregoryId = function(categoryId, take, skip) {
      take = take || 10;
      skip = skip || 0;
      return $http.get(autoApiPrefix + 'articles?category=' + categoryId + "&take=" + take + "&skip=" + skip);
    };

    resource.getArticleById = function(articleId) {
      return $http.get(autoApiPrefix + 'articles/' + articleId + '?links=true');
      //return Restangular.one('articles', articleId).get({links: true});
    };

    resource.getMoreArticlesForCategory = function(categoryId,skip) {
      return $http.get(autoApiPrefix + 'articles?category=' + categoryId + "&take=10&skip=" + skip);
    };

    return resource;
  }
]);
