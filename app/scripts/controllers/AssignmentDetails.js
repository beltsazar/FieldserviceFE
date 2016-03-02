'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AssignmentDetails', function ($resource, $routeParams, $location, $filter, Assignments, Areas) {

  var ctrl = this;

  ctrl.id = $routeParams.id;

  ctrl.model = {
    assignment: {}
  };

  ctrl.entities = {
    areas: []
  };

  // Haal de resource op bij inladen controller, behalve bij create
  if(ctrl.id !== 'create') {
    Assignments.get({id: ctrl.id, projection: 'entities'}).$promise.then(function (response) {
      ctrl.model.assignment = response;
      ctrl.model.assignment.area.id += '';
    });
  }

  // Get the areas
  Areas.query({
    projection: 'entities',
    sort: ['city.name','number']
  }).$promise.then(function (result) {
    ctrl.entities.areas = result;
  });

  // Maak nieuwe resource
  this.create = function() {
    Assignments.create({}, ctrl.model.assignment).$promise.then(function(response) {
      Assignments.updateEntity({id: response.id, entity: 'area'}, '/areas/' + ctrl.model.assignment.area.id).$promise.then(function () {
        $location.path('/admin/assignments');
      });
    });
  };

  // Save de bewerkte resource
  this.update = function() {
    Assignments.update({id : ctrl.id}, ctrl.model.assignment).$promise.then(function() {
      Assignments.updateEntity({id: ctrl.id, entity: 'area'}, '/areas/' + ctrl.model.assignment.area.id).$promise.then(function () {
        $location.path('/admin/assignments');
      });
    });
  };

  // Verwijder de resource
  this.delete = function() {
    Assignments.delete({id : ctrl.id}).$promise.then(function() {
      $location.path('/admin/assignments');
    });
  };


});
