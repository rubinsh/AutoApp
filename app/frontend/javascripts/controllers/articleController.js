angular.module('autoControllers')
    .controller('ArticleCtrl', ['$scope', '$rootScope', '$routeParams', '$timeout', '$sce','$window', 'ArticlesServices',
        function($scope, $rootScope, $routeParams, $timeout, $sce, $window, ArticlesServices) {
            $scope.article_id = $routeParams.articleId;
            $scope.mako_url = $sce.trustAsResourceUrl("http://mobileapp.mako.co.il/metricsCall.html?vcmId=Auto_" + $scope.article_id + "&channelId=Auto&contentType=Auto_content&platform=mobile");
            $scope.mako_personalization_url = $sce.trustAsResourceUrl("http://rcs.mako.co.il/html/p13n_sat_iframe.html?content=%D7%90%D7%95%D7%98%D7%95");
            $scope.categoryId = ArticlesServices.currentCategory ? ArticlesServices.currentCategory : 1;

            $scope.showMainAdInArticle = false;
            if ($window.showMainAdInArticle) {
                $scope.showMainAdInArticle = true;
                $window.showMainAdInArticle = false;
            }

            ArticlesServices.getArticleById($scope.article_id, $routeParams.autodrm).success(function(data) {
                $scope.article = data[0];

                $scope.article.content = $scope.article.content.replace(/&nbsp;/gi,"");
                $scope.trustedDesktopUrl = $sce.trustAsResourceUrl(encodeURIComponent($scope.article.desktopUrl));
                $scope.trustedDesktopUrlForOutbrain = $sce.trustAsResourceUrl($scope.article.desktopUrl);
                $rootScope.canonicalUrl = $sce.trustAsResourceUrl($scope.article.desktopUrl);
                $rootScope.hasCanonicalUrl = true;
                $scope.currUrl =$sce.trustAsResourceUrl($window.location.href);
                window.scrollTo(0,0);

                if ((Boolean($routeParams.autodrm) || $scope.article.autodrm) && window.SharedObject) {
                    eval($scope.article.autodrm)
                }
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
