angular.module('autoControllers')
.controller('CarCompareController', ['$scope', '$timeout', '$location', 'ManufacturersServices', 'VersionsServices','SearchServices',
            function($scope, $timeout, $location, ManufacturersServices, VersionsServices, SearchServices) {
              // $scope.manufacturers = [];
              // $scope.clearFilter();

              ManufacturersServices.getAllManufacturers().then(function(results) {
                console.log(results);
                $scope.manufacturers = results.data;
                $timeout(function() {
                  $('select').selectpicker();
                });
              });

              maufacturerSelected = function(selectBoxNumber) {
                var selectedId = $(this).find("option:selected").data("id");

                var selectedName = $(this).find("option:selected").val();
                console.log(selectedName);
                $("#compare-model-" + selectBoxNumber).prop("disabled",true);
                $("#compare-model-" + selectBoxNumber).selectpicker('refresh');
                
                SearchServices.getSearchResaulForAllManufacturerModels(selectedId).then(function(results) {
                  $timeout(function() {
                    angular.forEach(results.data,function(item,index) {
                      item.name = item.name.replace(selectedName,"").replace("-","").trim();
                    });
                    $scope.selectedManufacturerName = selectedName;
                    $scope["models" + selectBoxNumber] = results.data;
                    $scope.$apply();
                    $("#compare-model-" + selectBoxNumber).prop("disabled",false);
                    $("#compare-model-" + selectBoxNumber).selectpicker('refresh');
                  });
                });
              };

              modelSelected = function(selectBoxNumber) {
                var selectedId = $(this).find("option:selected").data("id");
                var selectedName = $(this).find("option:selected").val();
                var selectedImageUrl = $(this).find("option:selected").data("image");
                $("#compare-version-" + selectBoxNumber).prop("disabled",true);
                $("#compare-version-" + selectBoxNumber).selectpicker('refresh');

                VersionsServices.getAllModelVersionsByModelId(selectedId).then(function(results) {
                    $timeout(function() {
                      $scope.selectedModelName = selectedName;
                      angular.forEach(results.data,function(item,index) {
                        item.name = item.name.replace(selectedName,"").replace("-","").replace($scope.selectedManufacturerName,"").trim();
                      });
                      $scope["versions" + selectBoxNumber] = results.data;
                      $scope["model" + selectBoxNumber + "Id"] = selectedId;
                      $scope["model" + selectBoxNumber + "ImageUrl"] = selectedImageUrl;
                      $scope.$apply();
                      $("#compare-version-" + selectBoxNumber).prop("disabled",false);
                      $("#compare-version-" + selectBoxNumber).selectpicker('refresh');
                    });
                });
              };

              versionSelected = function(selectBoxNumber) {
                var selectedId = $(this).find("option:selected").data("id");
                $timeout(function() {
                  $scope["version" + selectBoxNumber + "Id"] = selectedId;  
                  $scope.$apply();
                });
                
              };

              $('#compare-manf-1').on('change',function(event) {
                maufacturerSelected.call(this,"1");
              });

              $('#compare-manf-2').on('change',function(event) {
                maufacturerSelected.call(this,"2");
              });

              $('#compare-model-1').on('change',function(event) {
                modelSelected.call(this,"1");
              });

              $('#compare-model-2').on('change',function(event) {
                modelSelected.call(this,"2");
              });

              $('#compare-version-1').on('change',function(event) {
                versionSelected.call(this,"1");
              });

              $('#compare-version-2').on('change',function(event) {
                versionSelected.call(this,"2");
              });

              $scope.compare = function() {
                if ($scope.version1Id && $scope.version2Id) {
                  $scope.model1ImageUrl = encodeURIComponent($scope.model1ImageUrl);
                  $scope.model2ImageUrl = encodeURIComponent($scope.model2ImageUrl); 
                  var path = "/compare-result/model1/" + $scope.model1Id + "/version1/" + $scope.version1Id + "/model2/" + $scope.model2Id + "/version2/" + $scope.version2Id + "/image1/" + $scope.model1ImageUrl + "/image2/" + $scope.model2ImageUrl
                  $location.path(path);
                }
                else {
                  alert("יש לבחור 2 יצרנים, דגמים וגרסאות");
                }
              };

              $scope.clearFilter = function() {
                $scope.version1Id = undefined;
                $scope.version2Id = undefined;
                $scope.models1 = [];
                $scope.models2 = [];
                $scope.versions1 = [];
                $scope.versions2 = [];
                $timeout(function() {
                  $("#compare-model-1").prop("disabled",true);
                  $("#compare-model-2").prop("disabled",true);
                  $("#compare-version-1").prop("disabled",true);
                  $("#compare-version-2").prop("disabled",true);
                  $('.car-compare-page select').selectpicker('deselectAll');
                  $('.car-compare-page select').selectpicker('refresh');                  
                });

              };

            }]);
