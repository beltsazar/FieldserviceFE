'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AddressDetails', function ($resource, $routeParams, $location, $filter, $q, Addresses, Streets, Cities) {

  var ctrl = this;

  ctrl.model = {
    address: {},
    street: null,
    city: null
  };

  ctrl.entities = {
    cities: [],
    street: null
  };
  ctrl.id = $routeParams.id;

  // Haal de resource op bij inladen controller, behalve bij create
  if (ctrl.id !== 'create') {
    Addresses.get({id: ctrl.id}).$promise.then(function (response) {
      ctrl.model.address = response;

      // Get street entity
      Addresses.get({id: ctrl.id, entity: 'street'}).$promise.then(function (response) {
        ctrl.model.street = response._links.self.href;
      });

      // Get city entity
      Addresses.get({id: ctrl.id, entity: 'city'}).$promise.then(function (response) {
        ctrl.model.city = response._links.self.href;
      });

    });
  }

  // Haal de totale lijst van straten op
  Streets.get().$promise.then(function (result) {
    ctrl.entities.streets = result._embedded.streets;
  });

  // Haal de totale lijst van steden op
  Cities.get().$promise.then(function (result) {
    ctrl.entities.cities = result._embedded.cities;
  });

  // Save de bewerkte resource

  this.saveAddress = function () {
    Addresses.update({id: ctrl.id}, ctrl.model.address).$promise.then(function (response) {

      Addresses.updateEntity({id: ctrl.id, entity: 'street'}, ctrl.model.street).$promise.then(function (response) {

        Addresses.updateEntity({id: ctrl.id, entity: 'city'}, ctrl.model.city).$promise.then(function (response) {
          $location.path('/addresses');
        }).catch(function (response) {

        }).finally(function () {

        });

      }).catch(function (response) {

      }).finally(function () {

      });

    }).catch(function (response) {

    }).finally(function () {

    });

  };

  // Maak nieuwe resource
  this.createAddress = function () {
    var generatedId = null;

    Addresses.add({}, ctrl.model.address).$promise.then(function (response) {
      generatedId = $filter('id')(response._links.self.href);

      Addresses.updateEntity({id: generatedId, entity: 'street'}, ctrl.model.street).$promise.then(function () {

        Addresses.updateEntity({id: generatedId, entity: 'city'}, ctrl.model.city).$promise.then(function () {
          $location.path('/addresses');
        });

      });

    });

  };

  // Verwijder de resource
  this.deleteAddress = function () {
    Addresses.delete({id: ctrl.id}, ctrl.model.address).$promise.then(function () {
      $location.path('/addresses');
    });
  };


});
