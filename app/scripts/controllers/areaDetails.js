'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaDetails', function ($resource, $routeParams, $location, $filter, Areas, Addresses, Cities) {

  var ctrl = this;

  ctrl.model = {
    area: {}
  };

  ctrl.entities = {
    addresses: [],
    cities: []
  };

  ctrl.id = $routeParams.id;

  // Get the related addresses
  this.getAddresses = function() {
    Addresses.findByArea({
      area: 'areas/' + ctrl.id,
      projection: 'entities',
      sort: ['street.name','number']}).$promise.then(function (response) {
      ctrl.entities.addresses = response;
    });
  };

  // Get the list of cities
  this.getCities = function() {
    Cities.query({
      projection: 'entities',
      sort: ['name']}).$promise.then(function (response) {
      ctrl.entities.cities = response;
    });
  };

  // Maak nieuwe resource
  this.create = function() {
    Areas.create({}, ctrl.model.area).$promise.then(function(response) {

      Areas.updateEntity({
        id: response.id,
        entity: 'city' }, '/cities/' + ctrl.model.area.city.id).$promise.then(function () {
          $location.path('/admin/areas');
      });

    });
  };

  // Save de bewerkte resource
  this.update = function() {
    Areas.update({id : ctrl.id}, ctrl.model.area).$promise.then(function() {

      Areas.updateEntity({
        id: ctrl.id,
        entity: 'city' }, '/cities/' + ctrl.model.area.city.id).$promise.then(function () {
          $location.path('/admin/areas');
      });

    });
  };

  // Verwijder de resource
  this.delete = function() {
    Areas.delete({id : ctrl.id}, ctrl.model.area).$promise.then(function() {
      $location.path('/admin/areas');
    });
  };

	/**
   * Initialize
   */

  // Haal de resource op bij inladen controller, behalve bij create
  if(ctrl.id !== 'create') {
    Areas.get({id: ctrl.id, projection: 'entities'}).$promise.then(function (response) {
      ctrl.model.area = response;
      if(ctrl.model.area.city) {
        ctrl.model.area.city.id += '';
      }

      ctrl.getAddresses();

    });
  }

  // Get all the cities
  ctrl.getCities();

});
