'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AddressList', function (Addresses) {

  var ctrl = this;

  ctrl.addresses = [];

  Addresses.query({
    projection: 'entities',
    sort: ['area.id', 'street.name', 'number']
  }).$promise.then(function(result) {
    ctrl.addresses = result;
  });

});
