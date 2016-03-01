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
      return moment(input).format("dddd, d MMMM YYYY");
    };
  });
