'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaList', function (Areas) {

  var ctrl = this;

  ctrl.areas = [];

  Areas.query({sort : 'number', projection: 'entities'}).$promise.then(function(result) {
    ctrl.areas = result;
  });

});
