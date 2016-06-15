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

  ctrl.model = {
    sort: ['city.name', 'street.name', 'number', 'suffix']
  }

  ctrl.addresses = [];

  ctrl.page = {
    number: 1,
    size: 10
  };

  ctrl.getAddresses = function () {

    Addresses.query({
      projection: 'entities',
      sort: ctrl.model.sort,
      page: (ctrl.page.number - 1),
      size: ctrl.page.size
    }).$promise.then(function(result) {
      ctrl.addresses = result[0];
      ctrl.page = result[1];
      ctrl.page.number++;
    });

  };

  ctrl.getAddresses();


});
