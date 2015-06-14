angular.module('autoControllers')
    .controller('ArticleCtrl', ['$scope', '$routeParams', '$timeout', '$sce', 'ArticlesServices',
        function($scope, $routeParams, $timeout, $sce, ArticlesServices) {
            $scope.article_id = $routeParams.articleId;
            $scope.mako_url = $sce.trustAsResourceUrl("http://mobileapp.mako.co.il/metricsCall.html?vcmId=Auto_" + $scope.article_id + "&channelId=Auto&contentType=Auto_content&platform=mobile");
            $scope.categoryId = ArticlesServices.currentCategory ? ArticlesServices.currentCategory : 1;

            ArticlesServices.getArticleById($scope.article_id).success(function(data) {
                $scope.article = data[0];
                window.scrollTo(0,0);
            });

            var articlesWithIframe = {
                26420: '70631046',
                25588: '14507171',
                31189: '23924656',
                32310: '52307411',
                31996: '81979374',
                31889: '24605803'
            }

            $scope.iFrameId = function(article) {
                return ((typeof(article) !== "undefined") && (typeof(articlesWithIframe[article.articleId]) !== "undefined"));
            }

            $scope.iFrameSrc = function(article) {
                return $scope.mako_url = $sce.trustAsResourceUrl("https://rotaryview.com/player?id=" + articlesWithIframe[article.articleId]);
            }

            $scope.fbShare = function () {
                FB.ui({
                  method: 'share',
                  display: 'touch',
                  href: 'http://www.auto.co.il/view.aspx?article=' + $scope.article_id,
                }, function(response){
                    if(response && response.post_id) {
                        console.log('Publish was completed');
                    } else {
                        console.log('Publish did not complete');
                    }
                });
            }
        }
    ]);
