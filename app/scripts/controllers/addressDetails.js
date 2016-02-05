'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AddressDetails', function ($resource, $routeParams, $location, $filter, Addresses, Cities) {

  var ctrl = this;

  ctrl.address = {};
  ctrl.entities = {
    cities : {},
    city: {}
  };
  ctrl.id = $routeParams.id;

  // Haal de resource op bij inladen controller, behalve bij create
  if(ctrl.id !== 'create') {
    Addresses.get({id: ctrl.id}).$promise.then(function (response) {
      ctrl.address = response;

      // Get city entity
      Addresses.get({id : ctrl.id, entity: 'city'}).$promise.then(function (response) {
        ctrl.entities.city = response._links.self.href;
      });

    });
  }

  // Haal de totale lijst van steden op
  Cities.get().$promise.then(function(result) {
    ctrl.entities.cities = result._embedded.cities;
  });

  // Save de bewerkte resource
  this.saveAddress = function() {
    Addresses.update({id : ctrl.id}, ctrl.address).$promise.then(function() {

      // Save city entity
      Addresses.updateEntity({id : ctrl.id, entity: 'city'}, ctrl.entities.city).$promise.then(function() {
        $location.path('/addresses');
      });

    });
  };

  // Maak nieuwe resource
  this.createAddress = function() {
    Addresses.add({}, ctrl.address).$promise.then(function(response) {

      // Save city using newly id of newly created address
      Addresses.updateEntity({id : $filter('id')(response._links.self.href), entity: 'city'}, ctrl.entities.city).$promise.then(function() {
        $location.path($filter('path')(response._links.self.href));
      });

    });
  };

  // Verwijder de resource
  this.deleteAddress = function() {
    Addresses.delete({id : ctrl.id}, ctrl.address).$promise.then(function() {
      $location.path('/addresses');
    });
  };



});
