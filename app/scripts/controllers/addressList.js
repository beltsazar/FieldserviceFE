'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AddressList', function (Addresses, $resource, $routeParams) {

  var ctrl = this;

  ctrl.addresses = [];

  Addresses.get().$promise.then(function(result) {
    ctrl.addresses = result._embedded.addresses;
  });

});
