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
  .filter('id', function () {
    return function (input) {
      var path = input.replace(/^(.*:)\/\/([A-Za-z0-9\-\.]+)(:[0-9]+)?(.*)$/, '$4');

      return path.split('/')[2];
    };
  });
