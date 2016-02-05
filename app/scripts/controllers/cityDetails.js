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

  ctrl.city = {};
  ctrl.id = $routeParams.id;

  // Haal de resource op bij inladen controller, behalve bij create
  if(ctrl.id !== 'create') {
    Cities.get({id: ctrl.id}).$promise.then(function (response) {
      ctrl.city = response;
    });
  }

  // Save de bewerkte resource
  this.saveCity = function() {
    Cities.update({id : ctrl.id}, ctrl.city).$promise.then(function() {
      $location.path('/cities');
    });
  };

  // Verwijder de resource
  this.deleteCity = function() {
    Cities.delete({id : ctrl.id}, ctrl.city).$promise.then(function() {
      $location.path('/cities');
    });
  };

  // Maak nieuwe resource
  this.createCity = function() {
    Cities.add({}, ctrl.city).$promise.then(function(response) {
      $location.path($filter('path')(response._links.self.href));
    });
  };

});
