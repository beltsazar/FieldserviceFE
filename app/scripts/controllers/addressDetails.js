'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AddressDetails', function ($resource, $routeParams, $location, $filter, $q, Addresses, Streets, Cities, Areas) {

  var ctrl = this;

  ctrl.model = {
    address: {}
  };

  ctrl.entities = {
    streets: [],
    areas: [],
    cities: []
  };

  ctrl.id = $routeParams.id;

  // Haal de resource op bij inladen controller, behalve bij create
  if (ctrl.id !== 'create') {
    Addresses.get({id: ctrl.id, projection: 'entities'}).$promise.then(function (response) {
      ctrl.model.address = response;
      ctrl.model.address.street.id += '';
      ctrl.model.address.area.id += '';
    });
  }

  // Haal de totale lijst van straten op
  Streets.query().$promise.then(function (result) {
    ctrl.entities.streets = result;
  });

  // Get the areas
  Areas.query({
    projection: 'entities',
    sort: ['city.name','number']
  }).$promise.then(function (result) {
    ctrl.entities.areas = result;
  });

  Cities.query({
    sort: 'name,asc'
  }).$promise.then(function(result) {
    ctrl.entities.cities = result;
  });

  // Maak nieuwe resource
  this.create = function () {
    var generatedId = null;

    Addresses.create({}, ctrl.model.address).$promise.then(function (response) {
      generatedId = response.id;

      Addresses.updateEntity({id: generatedId, entity: 'street'}, '/streets/' + ctrl.model.address.street.id).$promise.then(function () {

        Addresses.updateEntity({id: generatedId, entity: 'area'}, '/areas/' + ctrl.model.address.area.id).$promise.then(function () {

          Addresses.updateEntity({id: generatedId, entity: 'city'}, '/cities/' + ctrl.model.address.city.id).$promise.then(function () {

            $location.path('/admin/addresses/' + generatedId);

          });

        });

      });

    });

  };

  // Save de bewerkte resource
  this.update = function () {
    var address = angular.copy(ctrl.model.address);
    delete address.area;
    delete address.city;

    Addresses.update({id: ctrl.id}, ctrl.model.address).$promise.then(function () {

      Addresses.updateEntity({
        id: ctrl.id,
        entity: 'street' }, '/streets/' + ctrl.model.address.street.id).$promise.then(function () {

        Addresses.updateEntity({
          id: ctrl.id,
          entity: 'area' }, '/areas/' + ctrl.model.address.area.id).$promise.then(function () {

          Addresses.updateEntity({
            id: ctrl.id,
            entity: 'city' }, '/cities/' + ctrl.model.address.city.id).$promise.then(function () {

          });

        });

      });

    });

  };

  // Verwijder de resource
  this.delete = function () {
    Addresses.delete({id: ctrl.id}, ctrl.model.address).$promise.then(function () {
      $location.path('/admin/addresses');
    });
  };

});
