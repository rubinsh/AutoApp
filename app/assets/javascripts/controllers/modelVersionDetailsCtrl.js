angular.module('autoControllers')
    .controller('ModelVersionDetailsCtrl', ['$timeout', '$scope', '$routeParams', 'VersionsServices', 'CatalogServices',
        function($timeout, $scope, $routeParams, VersionsServices, CatalogServices) {
            var model_id = $routeParams.modelId;
            var version_id = $routeParams.versionId;
            $scope.showContent = false;

            console.log($routeParams);
            VersionsServices.getModelVersionDetailsByModelIDAndVersionID(model_id, version_id).success(function(data) {
                console.log(data);
                $scope.versionDetails = [];
                $scope.title = data[0].name;

                var obj = {};
                obj.key = 'תיאור';
                obj.items = [{
                    title: 'מחיר:',
                    value: data[0].price
                }, {
                    title: 'אחריות:',
                    value: data[0].warranty
                }, {
                    title: 'קבוצה:',
                    value: data[0].category
                }, {
                    title: 'מרכב:',
                    value: data[0].chassis
                }, {
                    title: 'קבוצת רישוי:',
                    value: data[0].licensingGroup
                }, {
                    title: 'מקומות ישיבה:',
                    value: data[0].seats
                }, {
                    title: 'מקומות ישיבה:',
                    value: data[0].seats
                }, {
                    title: 'כריות אוויר:',
                    value: data[0].airbags
                }, {
                    title: 'ציון בטיוחות מבוגרים:',
                    value: data[0].crashTestOld.adults
                }, {
                    title: 'ציון בטיוחות ילדים:',
                    value: data[0].crashTestOld.children
                }];
                $scope.versionDetails.push(angular.copy(obj));

                obj.key = 'מידות';
                obj.items = [{
                    title: 'אורך:',
                    value: data[0].dimensions.length
                }, {
                    title: 'רוחב:',
                    value: data[0].dimensions.width
                }, {
                    title: 'גובה:',
                    value: data[0].dimensions.height
                }, {
                    title: 'משקל:',
                    value: data[0].dimensions.weight
                }, {
                    title: 'בסיס גלגלים:',
                    value: data[0].dimensions.wheelBase
                }, {
                    title: 'קוטר סיבוב:',
                    value: data[0].dimensions.turnDiameter
                }, {
                    title: 'נפח תא מטען:',
                    value: data[0].dimensions.trunkVolume
                }, {
                    title: 'צמיגים קדמיים:',
                    value: data[0].dimensions.frontTires
                }, {
                    title: 'צמיגים אחוריים:',
                    value: data[0].dimensions.rearTires
                }, {
                    title: 'נפח תא דלק:',
                    value: data[0].dimensions.fuelTankCapacity
                }];
                $scope.versionDetails.push(angular.copy(obj));

                obj.key = 'מתלים ובלמים';
                obj.items = [{
                    title: 'מתלים קדמיים:',
                    value: data[0].suspensionBrakes.FrontSuspension
                }, {
                    title: 'מתלים אחוריים:',
                    value: data[0].suspensionBrakes.RearSuspension
                }, {
                    title: 'בלמים קדמיים:',
                    value: data[0].suspensionBrakes.FrontBrakes
                }, {
                    title: 'בלמים אחוריים:',
                    value: data[0].suspensionBrakes.RearBrakes
                }, {
                    title: 'תגבור הגה:',
                    value: data[0].suspensionBrakes.steeringWheelReinforcement
                }];
                $scope.versionDetails.push(angular.copy(obj));

                obj.key = 'ביצועים';
                obj.items = [{
                    title: '0 ל- 100 קמ"ש:',
                    value: data[0].performance.zeroTo100
                }, {
                    title: 'מהירות מרבית:',
                    value: data[0].performance.maxSpeed
                }];
                $scope.versionDetails.push(angular.copy(obj));

                obj.key = 'מנוע';
                obj.items = [{
                    title: 'סוג מנוע:',
                    value: data[0].engine.engineType
                }, {
                    title: 'נפח מנוע:',
                    value: data[0].engine.engineCapacity
                }, {
                    title: 'תצורה:',
                    value: data[0].engine.configuration
                }, {
                    title: 'תזמון:',
                    value: data[0].engine.timing
                }, {
                    title: 'כ"ס \\ סל"ד:',
                    value: data[0].engine.hp2rpm
                }, {
                    title: 'מומנט \\ סל"ד:',
                    value: data[0].engine.torque2rpm
                }, {
                    title: 'הנעה:',
                    value: data[0].engine.propulsion
                }, {
                    title: 'תיבת הילוכים:',
                    value: data[0].engine.gearbox
                }];
                $scope.versionDetails.push(angular.copy(obj));

                obj.key = 'צריכת דלק (יצרן)';
                obj.items = [{
                    title: 'ביהעירוני:',
                    value: data[0].fuelConsumption.longDistance
                }, {
                    title: 'עירוני:',
                    value: data[0].fuelConsumption.urban
                }, {
                    title: 'ממוצע:',
                    value: data[0].fuelConsumption.Average
                }, {
                    title: 'דרגת זיהום אוויר:',
                    value: data[0].fuelConsumption.degreeOfPollution
                }];
                $scope.versionDetails.push(angular.copy(obj));

                obj.key = 'בטיחות';
                obj.items = [];
                var arr = data[0].safety.split(',');
                angular.forEach(arr, function(item, key) {
                    obj.items.push({
                        title: item,
                        value: true
                    });
                });
                $scope.versionDetails.push(angular.copy(obj));

                obj.key = 'מבחני ריסוק (חדשים)';
                obj.items = [{
                    title: 'ציון כללי:',
                    value: data[0].crashTestNew.score
                }, {
                    title: 'מבוגרים:',
                    value: data[0].crashTestNew.adults
                }, {
                    title: 'ילדים:',
                    value: data[0].crashTestNew.children
                }, {
                    title: 'הולכי רגל:',
                    value: data[0].crashTestNew.pedestrians
                }];
                $scope.versionDetails.push(angular.copy(obj));

                obj = {};
                obj.key = 'איבזור';
                obj.items = [];
                arr = data[0].equipment.split(',');
                angular.forEach(arr, function(item, key) {
                    obj.items.push({
                        title: item,
                        value: true
                    });
                });
                $scope.versionDetails.push(angular.copy(obj));
                $scope.showContent = true;

                // $scope.$broadcast('InitCtrlFinish');
                // $timeout(function() {
                //     $scope.$broadcast('InitCtrlFinish');
                // });
            });
        }
    ]);