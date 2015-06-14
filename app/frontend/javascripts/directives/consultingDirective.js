angular.module('autoDirectives')
.directive('consulting', ['$templateCache', '$timeout',
		   function($templateCache, $timeout) {
			 return {
			   restrict: 'E',
			   template: $templateCache.get('consultingWidget'),
			   link: function(scope, elem, attrs) {
			   		scope.afterSubmit = false;
			   		scope.submitClick = false;
            scope.hideConsulting = function() {
			   			
              $timeout(function() { 
                $('.consulting-widget').removeClass('slideInUp').addClass('slideOutDown');
                scope.showConsulting = false; 
              },300);
            };

            scope.displayConsulting = function() {
            	scope.afterSubmit = false;
            	$('.consulting-widget').removeClass('slideOutDown').addClass('slideInUp');
              scope.showConsulting = true;
            };
            $("input").on('focus',function(event) {
              console.log('focus');
              $('#direct-call').hide();
            });

            $("input").on('blur',function(event) {
              console.log('focus out');
              $('#direct-call').show();
            });

						$('#main_form button.btn').on('mousedown',function() {
								var phone = $("input[type='tel']")[0].value;
								var name = $("input[type='text']")[0].value;
								if (name.trim().length === 0) {
								  alert("נא הזן שם");
								  return;
								}
								if (!phone.match(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/)) {
									alert("אנא הזן מספר טלפון תקין");
									return;
								}
								scope.submitClick = true;
								scope.$apply();
								$.ajax({
								  type: "GET",
								  beforeSend: function (request)
								  {
										request.setRequestHeader("Content-Type", "application/json");
										request.setRequestHeader("charset", "utf-8");
								  },
								  url: autoApiPrefix+ "update/?name=" + name + "&phone=" + phone,
								  success: function() {
										scope.afterSubmit=true;
										scope.submitClick = false;
										scope.$apply();
								  	$('.consulting-widget input').val("");
										$timeout(scope.hideConsulting,4000);
								  },
								  error: function() {
										$('.main_form').html("<h3 class='form_title'>אירעה שגיאה, אנא נסו שנית מאוחר יותר</h3>");
										scope.submitClick = false;
										scope.$apply();
								  },
								  dataType: "json"
								});
						});
			   }

			 };
		}
]);
