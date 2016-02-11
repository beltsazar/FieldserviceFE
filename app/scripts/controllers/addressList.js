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
  Addresses.get({
    projection: 'entities',
    sort: ['city.name', 'street.name', 'number']
  }).$promise.then(function(result) {
    ctrl.addresses = result._embedded.addresses;
  });

});
