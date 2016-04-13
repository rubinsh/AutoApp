angular.module('autoServices')
    .factory('NavServices', [
        function() {
            var sharedService = {};

            sharedService.navIdMsg = '';

            sharedService.navs = [{
                name: 'קטלוג הרכב',
                img: '......',
                route: '/catalog/manufacturers'
            }, {
                name: 'כתבות',
                img: '......',
                route: '/articles'
            },
            {
              name: 'מבחני רכב',
              img: '........',
              route: '/articles/category/75'
            },
            {
                name: 'מדריך קניה',
                img: '......',
                route: '/guide'
            },
            {
                name: 'השוואת רכבים',
                img: '......',
                route: '/compare'
            },
            {
                name: 'לייף סטייל',
                img: '......',
                route: '/articles/category/1428'
            },
            {
                name: 'ליסינג',
                img: '......',
                route: '/leasing'
            },
            {
                name: 'יעוץ חינם לקניית רכב',
                img: '......',
                route: '/consulting'
            }
            ];

            return sharedService;
        }
    ]);
