'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('CityDetails', function ($resource, $routeParams, $location, $filter, Cities) {

  var ctrl = this;

  ctrl.model = {
    city: {}
  };

  ctrl.model.city = {};
  ctrl.id = $routeParams.id;

  // Haal de resource op bij inladen controller, behalve bij create
  if(ctrl.id !== 'create') {
    Cities.get({id: ctrl.id}).$promise.then(function (response) {
      ctrl.model.city = response;
    });
  }

  // Maak nieuwe resource
  this.create = function() {
    Cities.create({}, ctrl.model.city).$promise.then(function(response) {
      $location.path('/admin/cities');
    });
  };

  // Save de bewerkte resource
  this.update = function() {
    Cities.update({id : ctrl.id}, ctrl.model.city).$promise.then(function() {
      $location.path('/admin/cities');
    });
  };

  // Verwijder de resource
  this.delete = function() {
    Cities.delete({id : ctrl.id}, ctrl.model.city).$promise.then(function() {
      $location.path('/admin/cities');
    });
  };


});
