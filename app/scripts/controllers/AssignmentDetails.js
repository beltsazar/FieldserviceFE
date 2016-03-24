'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AssignmentDetails', function ($resource, $routeParams, $location, $filter, Assignments, Areas, Worksheets) {

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
      if (ctrl.model.assignment.area !== null) {
        ctrl.model.assignment.area.id += '';
      }
    });
  }
  else {
    ctrl.model.assignment.active = true;
    ctrl.model.assignment.personal = false;
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
    var assignment = angular.copy(ctrl.model.assignment);
    assignment.area = '/areas/' + ctrl.model.assignment.area.id;

    Assignments.create({}, assignment).$promise.then(function(response) {
      $location.path('/admin/assignments/' + response.id);
    });
  };

  // Save de bewerkte resource
  this.update = function() {
    var assignment = angular.copy(ctrl.model.assignment);
    assignment.area = '/areas/' + ctrl.model.assignment.area.id;
    Assignments.update({id : ctrl.id}, assignment).$promise.then(function() {
    });
  };

  // Verwijder de resource
  this.delete = function() {
    Assignments.delete({id : ctrl.id}).$promise.then(function() {
      $location.path('/admin/assignments');
    });
  };

  // Maak nieuwe resource
  this.createWorksheet = function() {
    Worksheets.create({}, {}).$promise.then(function(response) {
      ctrl.model.assignment.worksheet = response;
      Worksheets.updateEntity({id: response.id, entity: 'assignment'}, '/assignment/' + ctrl.model.assignment.id).$promise.then(function () {
      });
    });
  };

  this.close = function() {
    ctrl.model.assignment.active = false;
    ctrl.model.assignment.closeDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    ctrl.update();
  };

});
