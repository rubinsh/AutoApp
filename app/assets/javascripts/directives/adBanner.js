angular.module('autoDirectives')
.directive('adBanner',['$http',
           function($http) {
             return {
               restrict: 'AE',
               scope: {},
               link: function(scope, element) {
                 $('body').css('padding-bottom','30px');
                 var atp_uid = new Date().getTime();
                 console.log('linking:  ' + atp_uid);
                 $http.get('http://ads.atpclick.com/atpClick.aspx?z=390&a=385&t=_blank&uid='+atp_uid+'&c=script')
                           .success(function(response) {
                             elem = document.getElementById('auto-ad-container');
                             if ((!elem) || (response === "/* There is no banner to server... */"))
                               {
                                 console.log('no banner - leaving...');
                                 return;
                               }
                               document.getElementById('auto-ad-container').innerHTML = response.split('\'')[1];
                               var link_elem = $('a',$('#auto-ad-container')[0])[0];
                               var addr = link_elem.attributes.href.value;
                               link_elem.parentElement.replaceChild(link_elem.childNodes[0],link_elem);
                               var img_elem = $("img",$('#auto-ad-container')[0])[0];

                               img_elem.onclick = function() {
                                 var location = addr;
                                 console.log(location);
                                 if (window.plugins.childBrowser) { window.plugins.childBrowser.showWebPage(location); }
                                 else { window.location = location;} };
                           });

                           scope.$on("$destroy", function(){
                             console.log('leaving...');
                             $('body').css('padding-bottom',0);
                           });

               }
             };
           }
]);
