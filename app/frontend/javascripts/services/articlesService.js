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

    var convertToLargeImage = function(imageUrl) {
      return imageUrl.split(".jpg")[0]+"-4.jpg";
    };

    resource.getAllArticlesForMainPage = function() {
      var deferred = $q.defer();
      promise1 = $http.get(autoApiPrefix + 'articles/grouped?categories=74,75,76,1294,1297,1374&groupcount=3&ignoreLatest=true');
      promise2 = $http.get(autoApiPrefix + 'articles/latest?limit=6');

      $q.all([promise1,promise2]).then(function(promises) {
        angular.forEach(promises[1].data,function(item,index) {
          item.imageUrl = convertToLargeImage(item.imageUrl);
        })
        deferred.resolve(promises[1].data.concat(promises[0].data));
      });

      return deferred.promise;
    };

    resource.getAllArticlesByCatregoryId = function(categoryId, take, skip) {
      take = take || 10;
      skip = skip || 0;
      return $http.get(autoApiPrefix + 'articles?category=' + categoryId + "&take=" + take + "&skip=" + skip);
    };

    resource.getArticleById = function(articleId, isDrm) {
      return $http.get(autoApiPrefix + 'articles/' + articleId + '?links=true' + (isDrm ? '&autodrm=true' : ''));
      //return Restangular.one('articles', articleId).get({links: true});
    };

    resource.getMoreArticlesForCategory = function(categoryId,skip) {
      return $http.get(autoApiPrefix + 'articles?category=' + categoryId + "&take=10&skip=" + skip);
    };

    return resource;
  }
]);
