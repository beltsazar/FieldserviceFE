'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AssignmentDetails', function ($resource, $routeParams, $location, $filter, Assignments, Areas, Accounts, Worksheets, Campaigns) {

  var ctrl = this;

  ctrl.id = $routeParams.id;
  ctrl.areaId = $routeParams.areaId;

  ctrl.model = {
    assignment: {}
  };

  ctrl.entities = {
    areas: [],
    accounts: [],
    campaigns: []
  };

  // Haal de resource op bij inladen controller, behalve bij create
  if(ctrl.id !== 'create') {
    Assignments.get({id: ctrl.id, projection: 'entities'}).$promise.then(function (response) {
      ctrl.model.assignment = response;

      if (angular.isDefined(ctrl.model.assignment.account)) {
        ctrl.model.assignment.account.id += '';
      }

      getEntities('edit');
    });
  }
  else {
    ctrl.model.assignment.active = true;
    ctrl.model.assignment.personal = false;

    getEntities('create');
  }

  function getEntities(mode) {

    // Get the areas
    Areas.query({
      projection: 'entities',
      sort: ['city.name', 'number']
    }).$promise.then(function (result) {
      ctrl.entities.areas = result;

      if (angular.equals(mode, 'create')) {
        angular.forEach(ctrl.entities.areas, function (value) {
          if (angular.equals(value.id, parseInt(ctrl.areaId))) {
            ctrl.model.assignment.area = value;
          }
        });
      }

    });

    // Get the accounts
    Accounts.query({
      sort: ['firstName', 'lastName']
    }).$promise.then(function (result) {
      ctrl.entities.accounts = result;
    });

    // Get the accounts
    Campaigns.query({
      sort: ['active,desc','shortName,desc']
    }).$promise.then(function (result) {
      ctrl.entities.campaigns = result;

      if (angular.equals(mode, 'create')) {
        angular.forEach(ctrl.entities.campaigns, function (value) {
          if (value.active) {
            ctrl.model.assignment.campaign = value;
          }
        });
      }

    });

  }

  // Maak nieuwe resource
  this.create = function() {
    var assignment = angular.copy(ctrl.model.assignment);
    assignment.area = '/areas/' + ctrl.model.assignment.area.id;
    assignment.account = '/accounts/' + ctrl.model.assignment.account.id;
    assignment.campaign = '/campaigns/' + ctrl.model.assignment.campaign.id;

    Assignments.create({}, assignment).$promise.then(function(response) {
      $location.path('/admin/assignments/' + response.id);
    });
  };

  // Save de bewerkte resource
  this.update = function() {
    var assignment = angular.copy(ctrl.model.assignment);
    assignment.area = '/areas/' + ctrl.model.assignment.area.id;
    assignment.account = '/accounts/' + ctrl.model.assignment.account.id;
    assignment.campaign = '/campaigns/' + ctrl.model.assignment.campaign.id;

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
