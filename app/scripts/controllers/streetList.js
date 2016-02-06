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

  Streets.get().$promise.then(function(result) {
    ctrl.streets = result._embedded.streets;
  });

});
