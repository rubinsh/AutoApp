angular.module('autoControllers')
    .controller('CarModelCtrl', ['$scope', '$routeParams', '$sce', 'SearchServices', 'CatalogServices',
        function($scope, $routeParams, $sce, SearchServices, CatalogServices) {
            $scope.modelId = CatalogServices.getModelId();
            $scope.model_id = $routeParams.id;
            $scope.used_id = $routeParams.usedID;

            if ($scope.model_id) {
                if ($scope.used_id) {
                    console.log("Route with -id- routeParams & usd_id routeParams");
                    SearchServices.getModelUsedByUsedID($scope.model_id, $scope.used_id).success(function(data) {
                        setDataFromService(data);
                    });
                } else {
                    console.log("Route with -id- routeParams");
                    SearchServices.getSearchResaulForModelByModelId($scope.model_id).success(function(data) {
                        setDataFromService(data);
                    });
                }
            } else if ($scope.modelId > 0) {
                console.log("Route with modelID from catalogService");
                SearchServices.getSearchResaulForModelByModelId($scope.modelId).success(function(data) {
                    setDataFromService(data);
                });
            }

            function setDataFromService(data) {
                $scope.reviews = [];
                $scope.model = data[0];

                $scope.reviews.push({
                    title: 'חוות דעת',
                    content: data[0].review.text
                });
                $scope.reviews.push({
                    title: 'עיצוב ונוכחות',
                    content: data[0].review.design
                });
                $scope.reviews.push({
                    title: 'תא נוסעים ומטען',
                    content: data[0].review.cabin
                });
                $scope.reviews.push({
                    title: 'מנוע וביצועים',
                    content: data[0].review.performance
                });
                $scope.reviews.push({
                    title: 'נוחות והתנהגות',
                    content: data[0].review.comfort
                });
                $scope.reviews.push({
                    title: 'תמורה למחיר',
                    content: data[0].review.valueForMoney
                });
                $scope.reviews.push({
                    title: 'סיכום',
                    content: data[0].review.summary
                });
                $scope.reviews.push({
                    title: 'יתרונות',
                    content: data[0].review.advantages
                });
                $scope.reviews.push({
                    title: 'חסרונות',
                    content: data[0].review.disadvantages
                });

                $scope.tableData = [{
                    title: 'חוות דעת מומחה',
                    link: '#/catalog/model/review/' + $scope.model.id
                }, {
                    title: 'גרסאות',
                    link: '#/catalog/model/versions/' + $scope.model.id
                }, {
                    title: 'תמונות גלריה',
                    link: '#/catalog/model/gallery?id=' + $scope.model.galleryId
                }, {
                    title: 'וידאו',
                    link: '#/catalog/model/videos?id=' + $scope.model.videoId
                }, {
                    title: 'מתחרים',
                    link: '#/catalog/model/competitors?id=' + $scope.model.competitorsId
                }, {
                    title: 'דגמי יד שניה',
                    link: '#/catalog/models/' + $scope.model.id + '/useds'
                }];
            }
        }
    ]);
