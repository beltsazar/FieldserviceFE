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
  .filter('displayAreaType', function () {
    return function (area) {
      var displayAreaType = 'P';

      if (angular.equals(area.type, 'BUSINESS')) {
        displayAreaType = 'Z';
      }

      return displayAreaType;

    };
  })
  .filter('displayAreaName', function () {
    return function (area) {
      var displayAreaName = area.city.name + ' ' + area.number;

      if (angular.equals(area.type, 'BUSINESS')) {
        displayAreaName += ' Z';
      }

      return displayAreaName;

    };
  })
  .filter('displayAreaNameType', function () {
    return function (area) {
      var displayAreaName = ''

      if (angular.equals(area.type, 'BUSINESS')) {
        displayAreaName += 'Z';
      }

      return displayAreaName;

    };
  });


