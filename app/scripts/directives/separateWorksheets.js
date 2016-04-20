'use strict';

/**
 * @ngdoc directive
 * @name fieldserviceFeApp.directive:isActiveMenu
 * @description
 * # isActiveMenu
 */
angular.module('fieldserviceFeApp')
  .directive('separateWorksheets', function () {
    return {
      restrict: 'EA',
      link: function(scope, element, attrs) {
        scope.index = scope.$index + 1;

        scope.showLg = angular.equals((scope.index/4), Math.floor(scope.index/4));
        scope.showMd = angular.equals((scope.index/3), Math.floor(scope.index/3));
        scope.showSm = angular.equals((scope.index/2), Math.floor(scope.index/2));

      },
      template:
        '<p ng-if="showLg" class="visible-lg-block clearfix"></p>' +
        '<p ng-if="showMd" class="visible-md-block clearfix"></p>' +
        '<p ng-if="showSm" class="visible-sm-block clearfix"></p>'
    };
  });

