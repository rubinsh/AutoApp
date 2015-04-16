angular.module('autoControllers')
    .controller('ArticleCtrl', ['$scope', '$routeParams', '$timeout', 'ArticlesServices',
        function($scope, $routeParams, $timeout, ArticlesServices) {
            $scope.article_id = $routeParams.articleId;
            $scope.categoryId = ArticlesServices.currentCategory ? ArticlesServices.currentCategory : 1;

            ArticlesServices.getArticleById($scope.article_id).then(function(data) {
                $scope.article = data[0];
                window.scrollTo(0,0);
            });

            $scope.fbShare = function () {
                var redirectUrl = 
                redirectUrl = ['https://m.facebook.com/dialog/share?',
                                   'app_id=281382155321504',
                                   'client_id=281382155321504',
                                   '&display=touch',
                                   '&link=http%3A%2F%2Fwww.auto.co.il%2Fview.aspx?article=', $scope.article_id,
                                   '&redirect_uri=', window.encodeURIComponent(window.location)].join('');

               window.location = redirectUrl;
                // FB.ui({
                //   method: 'share',
                //   href: 'http://www.auto.co.il/view.aspx?article=' + $scope.article_id,
                // }, function(response){
                //     if(response && response.post_id) {
                //         console.log('Publish was completed');
                //     } else {
                //         console.log('Publish did not complete');
                //     }
                // });
            }
        }
    ]);
