'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaDetails', function ($resource, $routeParams, $location, $filter, Areas, Addresses) {

  var ctrl = this;

  ctrl.model = {
    area: {}
  };

  ctrl.entities = {
    addresses: []
  };

  ctrl.id = $routeParams.id;

  // Haal de resource op bij inladen controller, behalve bij create
  if(ctrl.id !== 'create') {
    Areas.get({id: ctrl.id}).$promise.then(function (response) {
      ctrl.model.area = response;
      ctrl.getAddresses();
    });
  }

  // Get the related addresses
  this.getAddresses = function() {
    Addresses.findByArea({
      area: 'areas/' + ctrl.id,
      projection: 'entities',
      sort: ['city.name','street.name','number']}).$promise.then(function (response) {
      ctrl.entities.addresses = response._embedded.addresses;
    });
  };

  // Save de bewerkte resource
  this.saveArea = function() {
    Areas.update({id : ctrl.id}, ctrl.model.area).$promise.then(function() {
      $location.path('/areas');
    });
  };

  // Verwijder de resource
  this.deleteArea = function() {
    Areas.delete({id : ctrl.id}, ctrl.model.area).$promise.then(function() {
      $location.path('/areas');
    });
  };

  // Maak nieuwe resource
  this.createArea = function() {
    Areas.add({}, ctrl.model.area).$promise.then(function(response) {
      $location.path('/areas');
    });
  };

});
