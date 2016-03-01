'use strict';

/**
 * @ngdoc directive
 * @name fieldserviceFeApp.directive:isActiveMenu
 * @description
 * # isActiveMenu
 */
angular.module('fieldserviceFeApp')
  .directive('isActiveMenu', function ($location) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var menuPath = element.find('A').attr('ng-href').replace('#', '');

        scope.$watch(function() {
          return $location.path();
        }, function(){
          if (angular.equals($location.path(),menuPath)) {
            element.addClass('active');
          }
          else {
            element.removeClass('active');
          }
        });
      }
    };
  });
