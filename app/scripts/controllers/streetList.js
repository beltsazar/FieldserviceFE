'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('StreetList', function (Streets, $resource, $routeParams) {

  var ctrl = this;

  ctrl.streets = [];

  Streets.query().$promise.then(function(result) {
    ctrl.streets = result;
  });

});
