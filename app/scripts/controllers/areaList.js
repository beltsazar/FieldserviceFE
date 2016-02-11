'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaList', function (Areas, $resource, $routeParams) {

  var ctrl = this;

  ctrl.areas = [];

  Areas.get({sort : 'number'}).$promise.then(function(result) {
    ctrl.areas = result._embedded.areas;
  });

});
