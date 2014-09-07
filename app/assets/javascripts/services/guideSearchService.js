angular.module('autoServices')
    .factory('GuideSearchService', ['$http',
        function($http) {
            self = this;
            var resource = {};
            self.startVal = 0;
            self.totalVal = 0;
            self.limitVal = 30;

            self.searchParams = {};

            resource.setSearchParams = function(params) {
                self.searchParams = params;
            };

            resource.getSearchParams = function() {
                return self.searchParams;
            };

            resource.setStartPosition = function(startParam) {
                self.searchParams.start = startParam;
            };

            resource.setTotalPosition = function(totalParam) {
                if (totalParam === 0) return;
                self.totalVal = totalParam;
            };

            resource.setLimit = function(limitParam) {
                self.searchParams.limit = limitParam;
            };

            resource.hasMoreDataToFetch = function() {
                return self.searchParams.start + self.searchParams.limit < self.totalVal;
            };

            resource.getGuideSearchResult = function() {
                self.startVal = 0;
                //var noCacheParams = angular.copy(self.searchParams);
                //noCacheParams._id = Date.now();
                return $http.get(autoApiPrefix + 'guide', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    params: self.searchParams
                });
            };

            resource.getMoreItemsResults = function() {
                self.startVal = self.startVal + self.limitVal;
                var moreSearchResults = angular.copy(self.searchParams);
                moreSearchResults.start = self.startVal;
                moreSearchResults.total = self.totalVal;
                return $http.get(autoApiPrefix + 'guide', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    params: moreSearchResults
                });
            };

            return resource;
        }
    ]);
