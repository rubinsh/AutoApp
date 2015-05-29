angular.module('autoDirectives')
.directive('moreArticles', ['$templateCache', '$timeout' , 'ArticlesServices',
           function($templateCache, $timeout, ArticlesService) {
             return {
               restrict: 'E',
               template: $templateCache.get('moreArticles'),
               link: function(scope, elem, attrs) {
                 var isPhone = Modernizr.mq('(max-width: 767px)');
                 var chunkSize = isPhone ? 2 : 4;
                 var scrollBounded = false;
                 scope.isLoading = true;

                 var shuffle = function(array) {
                   var currentIndex = array.length, temporaryValue, randomIndex;

                   // While there remain elements to shuffle...
                   while (0 !== currentIndex) {

                     // Pick a remaining element...
                     randomIndex = Math.floor(Math.random() * currentIndex);
                     currentIndex -= 1;

                     // And swap it with the current element.
                     temporaryValue = array[currentIndex];
                     array[currentIndex] = array[randomIndex];
                     array[randomIndex] = temporaryValue;
                   }

                   return array;
                 };

                 var loadMoreArticles = function() {
                    ArticlesService.getAllArticlesByCatregoryId(attrs.categoryId,9).success(function(data) {
                      scope.moreArticles = [];
                      data = _.filter(data,function(item) {
                        return item.articleId != attrs.currentArticleId;
                      })
                      data = shuffle(data);
                      scope.moreArticles = data;
                      scope.isLoading = false;
                   });

                 };


                 scope.$watch('article',function(article) {
                   if (!article) return; //only bind the scroll event when the article finished loading
                   if (scrollBounded) return; //prevent from scroll to bind more than once
                   $timeout(function() {
                     if ($(document).height() <= $(window).height()) {
                       loadMoreArticles();
                       console.debug('load articles without scroll');
                       scrollBounded = true;
                       return;
                     }
                     $(window).bind('scroll', function() {
                       console.debug('scrolling...');
                       if ($(window).scrollTop() > $(document).height() - $(window).height() - 500) {
                         scope.$apply(loadMoreArticles);
                         $(window).unbind('scroll');
                       }
                     });
                     scrollBounded = true;
                   });
                 });

               }
             };
           }
]);
