angular.module('autoDirectives')
.directive('articlecontentparser', [ '$compile',
  function($compile) {
  return {
    restrict: 'E',

    link: function(scope, element) {
      var fixIframes = function(newContent) {

        tmpElem = document.createElement('section');
        $(tmpElem).html(newContent);
        $('iframe',tmpElem).attr({
          width: "100%",
          style: "max-width: 450px",
          height: "300px"
        });
        return tmpElem.innerHTML;
      };

      var fixImages = function(newContent) {
        tmpElem = document.createElement('section'); //create a pseodu element in the dom in order to manipulate it with jQuery
        $(tmpElem).html(newContent);
        $('img',tmpElem).attr('class','img-responsive').removeAttr('height').removeAttr('width');
        return tmpElem.innerHTML; //strip the outer section and return the modified html
      };

      var fixLinks = function(newContent) {

        var fixLink = function(linkElem ,searchStr, urlPrefix) {
          var href = linkElem.attr('href');
          if (href) {
            if (href.indexOf(searchStr) > -1) {
              linkElem.attr('href', urlPrefix + href.split(searchStr)[1]);
              linkElem.removeAttr('target');
            }
          }
        };

        var convertToConsulting = function(linkElem,searchStr) {
          var href = linkElem.attr('href');
          if (href) {
            if (href.indexOf(searchStr) > -1) {
              linkElem.attr('href', "javascript:void(0)");
              linkElem.attr('ng-click',"displayConsulting()");
              linkElem.attr('class','article-consulting-link');
              linkElem.removeAttr('target');
            }
          }
        }

        tmpElem = document.createElement('section');
        $(tmpElem).html(newContent);
        angular.forEach($('a',tmpElem), function(item, index) {
          $item = $(item);
          fixLink($item, 'articleId=', '#/articles/');
          fixLink($item, 'model_id=','#/catalog/models/');
          fixLink($item, 'manufacturer=', '#/catalog/manufacturers/');
          convertToConsulting($item, '/?action=consulting');
        });
        return tmpElem.innerHTML;
      };

      scope.$watch('article.content', function(newContent) {
        if (typeof(newContent) !== 'undefined' && newContent !== "") {
          newContent = '<div>' + newContent + '<div>';
          newContent = fixIframes(newContent);
          newContent = fixImages(newContent);
          newContent = fixLinks(newContent);
          var el = angular.element(newContent);
          var compiledContent = $compile(el);
          element.append(el);
          compiledContent(scope);
        }
      });
    }
  };
}
]);
