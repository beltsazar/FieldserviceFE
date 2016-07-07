'use strict';

/**
 * @ngdoc directive
 * @name fieldserviceFeApp.directive:isActiveMenu
 * @description
 * # isActiveMenu
 */
angular.module('fieldserviceFeApp')
  .directive('dateInput', function ($location, $filter) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ngModel) {

        ngModel.$formatters.push(function(modelValue) {
          return ($filter('formatShortDate')(modelValue));
        });

        ngModel.$parsers.push(function (viewValue) {
          var splittedDate = viewValue.split('-'),
              time = moment().format("THH:mm:ss.SSS");


          return splittedDate[2] + '-' + splittedDate[1] + '-' + splittedDate[0] + time;
        });

      }
    };
  });
