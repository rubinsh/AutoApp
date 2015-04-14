angular.module('autoControllers')
    .controller('GuideSearchResultCtrl', ['$scope', '$location', 'GuideSearchService', 'CatalogServices',
        function($scope, $location, GuideSearchService, CatalogServices) {
            $scope.busy = false;
            $scope.empty = true;
            $scope.hasdata = true;

            GuideSearchService.getGuideSearchResult().success(function(data) {
                $scope.models = data.searchResult;
                setMoreDataParams(30, 0, data.total);
                $scope.busy = false;

                if (angular.isUndefined($scope.models) || $scope.models.length <= 0) {
                    $scope.empty = false;
                }
                console.log(data);
            });

            $scope.addMoreItems = function() {
                if (!$scope.busy) {
                    if (GuideSearchService.hasMoreDataToFetch()) {
                        console.log('adding more items...');
                        $scope.busy = true;
                        GuideSearchService.getMoreItemsResults().success(function(data) {
                            if ($scope.models) {
                                $scope.models.push.apply($scope.models, data.searchResult);
                                setMoreDataParams(data.limit, data.start, data.total);
                                $scope.busy = false;
                            }
                            console.log(data);
                        });
                    } else {
                        //TODO: send event to 'infinityscrollDirective' to remove window binding to 'scroll' event....
                        $scope.hasdata = false;
                    }
                }
            };

            $scope.setModelId = function(item_selected) {
                CatalogServices.setModel(item_selected);
            };

            $scope.setModel = function(model) {
              $location.path('/catalog/models/' + model.model_id);
            };

            function setMoreDataParams(limit, start, total) {
                GuideSearchService.setStartPosition(start);
                GuideSearchService.setTotalPosition(total);
                GuideSearchService.setLimit(limit);
            }
        }
    ]);
