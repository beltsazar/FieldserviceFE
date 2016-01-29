'use strict';

/**
 * @ngdoc filter
 * @name fieldserviceFeApp.filter:path
 * @function
 * @description
 * # path
 * Filter in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp')
  .filter('path', function () {
    return function (input) {
      return '#' + input.replace(/^(.*:)\/\/([A-Za-z0-9\-\.]+)(:[0-9]+)?(.*)$/, '$4');
    };
  });
