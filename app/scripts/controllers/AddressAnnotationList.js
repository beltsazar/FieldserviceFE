'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AddressAnnotationList', function (AddressAnnotations) {

  var ctrl = this;

  ctrl.model = {
    sort: ['creationDate,desc']
  }

  ctrl.annotations = [];

  ctrl.page = {
    number: 1,
    size: 10
  };

  ctrl.getAddressAnnotations = function () {

    AddressAnnotations.query({
      projection: 'entities',
      sort: ctrl.model.sort,
      page: (ctrl.page.number - 1),
      size: ctrl.page.size
    }).$promise.then(function(result) {
      ctrl.annotations = result[0];
      ctrl.page = result[1];
      ctrl.page.number++;
    });

  };

  ctrl.getAddressAnnotations();


});
