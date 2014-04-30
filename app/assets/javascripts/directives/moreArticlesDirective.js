angular.module('autoDirectives')
.directive('moreArticles', ['$templateCache', '$timeout' , 'ArticlesServices',
           function($templateCache, $timeout, ArticlesService) {
             return {
               restrict: 'E',
               template: $templateCache.get('templates/moreArticles'),
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
                   ArticlesService.getAllArticlesByCatregoryId(attrs.categoryId,8).success(function(data) {
                     scope.moreArticles = [];
                     data = shuffle(data);
                     //split the carousel data into chunks according to the size of the screen
                     while (data.length > 0) {
                       scope.moreArticles.push(data.splice(0,chunkSize));
                     }
                     scope.isLoading = false;
                     //workaround the problem of carousel rendered with width=0 because of videos
                     //$timeout(function() {
                     //  if ($('.rn-carousel-container').width() === 0) {
                     //    console.log('resize');
                         //force a reflow
                     //    $(window).trigger('resize');
                     //  }
                     //});
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
