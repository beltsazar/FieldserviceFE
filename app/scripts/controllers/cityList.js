'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('CityList', function (Cities, $resource, $routeParams) {

  var ctrl = this;

  ctrl.cities = [];

  Cities.get().$promise.then(function(result) {
    ctrl.cities = result._embedded.cities;
  });

});
