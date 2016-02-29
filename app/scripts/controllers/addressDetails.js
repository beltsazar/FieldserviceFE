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
    areas: []
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
  Areas.query({ projection: 'entities' }).$promise.then(function (result) {
    ctrl.entities.areas = result;
  });

  // Maak nieuwe resource
  this.create = function () {
    var generatedId = null;

    Addresses.create({}, ctrl.model.address).$promise.then(function (response) {
      generatedId = $filter('id')(response._links.self.href);

      Addresses.updateEntity({id: generatedId, entity: 'street'}, '/streets/' + ctrl.model.address.street.id).$promise.then(function () {

          Addresses.updateEntity({id: generatedId, entity: 'area'}, '/areas/' + ctrl.model.address.area.id).$promise.then(function () {
            $location.path('/admin/addresses');
          });

      });

    });

  };

  // Save de bewerkte resource
  this.update = function () {
    Addresses.update({id: ctrl.id}, ctrl.model.address).$promise.then(function () {

      Addresses.updateEntity({
        id: ctrl.id,
        entity: 'street' }, '/streets/' + ctrl.model.address.street.id).$promise.then(function () {

        Addresses.updateEntity({
          id: ctrl.id,
          entity: 'area' }, '/areas/' + ctrl.model.address.area.id).$promise.then(function () {
          $location.path('/admin/addresses');
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
