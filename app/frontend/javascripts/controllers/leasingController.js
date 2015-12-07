angular.module('autoControllers')
    .controller('LeasingCtrl', ['$scope', '$timeout', '$sce', 'ArticlesServices',
        function($scope, $timeout, $sce, ArticlesServices) {
            $scope.article = true; //workaround for the more-articles directive
            $timeout(function() { window.scrollTo(0,0); });
            $scope.leasingArticles = [
              {
                name: 'ליסינג מימוני עסקים',
                url: '/business-leasing'
              },
              {
                name: 'ליסינג תפעולי',
                url: '/operating-leasing'
              },
              {
                name: 'ליסינג פרטי',
                url: '/personal-leasing'
              },
              {
                name: 'ליסינג מימוני',
                url: '/finance-leasing'
              }
            ];

            $scope.leasingContent = [
              {
                name: 'מה זה ליסינג?',
                url: '/articles/32445'
              },
              {
                name: 'איזה סוגים של ליסינג יש?',
                url: '/articles/32451'
              },
              {
                name: 'קניית רכב מליסינג או טרייד-אין – כל מידע לפני הקניה',
                url: '/articles/32700'
              },
              {
                name: 'מדריך מושגים בליסינג',
                url: '/articles/25170'
              },
              {
                name: 'כל מה שרוצים לדעת על ליסינג',
                url: '/articles/category/83'
              },
              {
                name: 'מדריך הליסינג והמימון',
                url: '/articles/31218'
              },
              {
                name: 'ליסינג: שינויים בשווי שימוש ברכב היברידי וחשמלי',
                url: '/articles/32526'
              }
            ]

            $scope.personalLeasingContent = [
              {
                name: 'ליסינג',
                url: '/leasing'
              },
              {
                name: 'ליסינג פרטי - האם זה כדאי?',
                url: '/articles/32477'
              },
              {
                name: 'מדריך הליסינג והמימון',
                url: '/articles/31218'
              },
              {
                name: 'ליסינג מימוני לעסקים',
                url: '/business-leasing'
              },
              {
                name: 'ליסינג מימוני',
                url: '/finance-leasing'
              },
              {
                name: 'ליסינג תפעולי',
                url: '/operating-leasing'
              }
            ]

            $scope.businessLeasingContent = [
              {
                name: 'ליסינג',
                url: '/leasing'
              },
              {
                name: 'ליסינג מימוני - איך עושים עסקה טובה?',
                url: '/articles/32495'
              },
              {
                name: 'מדריך הליסינג והמימון',
                url: '/articles/31218'
              },
              {
                name: 'ליסינג פרטי',
                url: '/personal-leasing'
              },
              {
                name: 'ליסינג תפעולי',
                url: '/operating-leasing'
              },
              {
                name: 'ליסינג מימוני',
                url: '/finance-leasing'
              }
            ]


            $scope.financeLeasingContent = [
              {
                name: 'ליסינג',
                url: '/leasing'
              },
              {
                name: 'ליסינג פרטי - האם זה כדאי?',
                url: '/articles/32477'
              },
              {
                name: 'מדריך הליסינג והמימון',
                url: '/articles/31218'
              },
              {
                name: 'ליסינג מימוני לעסקים',
                url: '/business-leasing'
              },
              {
                name: 'ליסינג פרטי',
                url: '/personal-leasing'
              },
              {
                name: 'ליסינג תפעולי',
                url: '/operating-leasing'
              }
            ]


            $scope.operatingLeasingContent = [
              {
                name: 'ליסינג',
                url: '/leasing'
              },
              {
                name: 'ליסינג תפעולי - איך להפיק ממנו מקסימום תועלת?',
                url: '/articles/32501'
              },
              {
                name: 'ליסינג תפעולי? קל אוטו פונה לבעלי עסקים',
                url: '/articles/32518'
              },
              {
                name: 'מדריך הליסינג והמימון',
                url: '/articles/31218'
              },
              {
                name: 'כל מה שרוצים לדעת על ליסינג',
                url: '/articles/category/83'
              },
              {
                name: 'ליסינג פרטי',
                url: '/personal-leasing'
              },
              {
                name: 'ליסינג מימוני לעסקים',
                url: '/business-leasing'
              },
              {
                name: 'ליסינג מימוני',
                url: '/finance-leasing'
              }
            ]
        }
    ]);
