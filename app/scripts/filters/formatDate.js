'use strict';

/**
 * @ngdoc filter
 * @name fieldserviceFeApp.filter:formatDate
 * @function
 * @description
 * # formatDate
 * Filter in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp')
  .filter('formatDate', function () {
    return function (input) {
      if(angular.isDefined(input)) {
        return moment(input).format("dddd D MMMM YYYY");
      }
    };
  })
  .filter('formatShortDate', function () {
    return function (input) {
      if(angular.isDefined(input)) {
        return moment(input).format("DD-MM-YYYY");
      }
    };
  })
  .filter('formatBucketDateDay', function () {
    return function (input) {
      if(angular.isDefined(input)) {
        return moment(input).format("dddd");
      }
    };
  });
