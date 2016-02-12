'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:StreetlistCtrl
 * @description
 * # StreetlistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('StreetDetails', function ($resource, $routeParams, $location, $filter, Streets) {

  var ctrl = this;

  ctrl.model = {
    street: {}
  };

  ctrl.id = $routeParams.id;

  // Haal de resource op bij inladen controller, behalve bij create
  if(ctrl.id !== 'create') {
    Streets.get({id: ctrl.id}).$promise.then(function (response) {
      ctrl.model.street = response;
    });
  }

  // Save de bewerkte resource
  this.saveStreet = function() {
    Streets.update({id : ctrl.id}, ctrl.model.street).$promise.then(function() {
      $location.path('/admin/streets');
    });
  };

  // Verwijder de resource
  this.deleteStreet = function() {
    Streets.delete({id : ctrl.id}, ctrl.model.street).$promise.then(function() {
      $location.path('/admin/streets');
    });
  };

  // Maak nieuwe resource
  this.createStreet = function() {
    Streets.add({}, ctrl.model.street).$promise.then(function(response) {
      $location.path('/admin/streets');
    });
  };

});
