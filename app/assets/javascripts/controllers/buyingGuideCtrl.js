angular.module('autoControllers')
.controller('BuyingGuideCtrl', ['$scope', '$location', '$timeout', 'GuideSearchService',
            function($scope, $location, $timeout, GuideSearchService) {
              $scope.currentFilterKey = -1;
              $scope.collection = [];
              $scope.selectedIndex = -1;
              $scope.defaultSelections = [];
              $timeout(function() {
                  $('select').selectpicker();
              });

              var categoryCollection = [
                'כל הקטגוריות',
                'מיני / סופרמיני',
                'משפחתיות / קטנות',
                'משפחתיות / קומפקטיות',
                'משפחתיות גדולות / מנהלים',
                'סאלון',
                'פאר',
                'מיניוואן (עד 6 מושבים)',
                'מיניוואן (7 מושבים ויותר)',
                'פנאי / שטח בנוני',
                'פנאי / שטח גדול',
                'פנאי / שטח יוקרה',
                'ספורטיביות',
                'קופה קבריולה',
                'טנדרים',
                'מסחריות קטנות',
                'היברידי',
                'מכוניות על'
              ];

              var priceRangeCollection = [
                'כל המחירים',
                'עד 95,000',
                '95,000 - 120,000',
                '120,000 - 140,000',
                '140,000 - 165,000',
                '165,000 - 210,000',
                '210,000 - 300,000',
                'מעל ל- 300,000'
              ];

              var countryCollection = [
                'כל הארצות',
                "יפן",
                'ארה"ב',
                "קוריאה",
                "גרמניה",
                "איטליה",
                "אנגליה",
                "צרפת",
                "ספרד",
                "שבדיה",
                "צ'כיה"
              ];

              var engineCapacityCollection = [
                'כל המנועים',
                'עד 1.4 ליטר',
                '1.4 - 1.6 ליטר',
                '1.6 - 1.8 ליטר',
                '1.8 - 2.0 ליטר',
                '2.0 - 2.5 ליטר',
                '2.5 - 3.0',
                'מעל 3.0 ליטר'
              ];

              var filterNames = [
                {
                name: 'category',
                value: 0
              },
              {
                name: 'price_range',
                value: 0
              },
              {
                name: 'country',
                value: 0
              },
              {
                name: 'engine',
                value: 0
              }
              ];

              $scope.menus = [categoryCollection, priceRangeCollection, countryCollection, engineCapacityCollection];

              $scope.clearFilter = function() {
                angular.forEach($scope.menus, function(item, index) {
                  $('#guide-dropdown-' + index).selectpicker('val',item[0]);
                });
              };

              $scope.search = function() {
                var params = {};
                angular.forEach(filterNames, function(item, index) {
                    params[item.name] = $scope.menus[index].indexOf($('#guide-dropdown-' + index).val());
                });
                console.log(params);
                GuideSearchService.setSearchParams(params);
                GuideSearchService.setLimit(30);
                $location.url('/guide/search');
              };
            }]);
