'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AccountDetails', function ($resource, $routeParams, $location, $filter, Accounts) {

  var ctrl = this;

  ctrl.model = {
    city: {}
  };

  ctrl.entities = {
    roles: [
      {
        key: 'ROOT',
        label: 'Root'
      },
      {
        key: 'ADMIN',
        label: 'Administrator'
      },
      {
        key: 'USER',
        label: 'User'
      }
    ]
  };

  ctrl.model.account = {};
  ctrl.id = $routeParams.id;

  // Haal de resource op bij inladen controller, behalve bij create
  if(ctrl.id !== 'create') {
    Accounts.get({id: ctrl.id}).$promise.then(function (response) {
      ctrl.model.account = response;

      for(var i=0; i<ctrl.entities.roles.length; i++) {
        if (angular.equals(ctrl.entities.roles[i].key, ctrl.model.account.role)) {
          ctrl.model.account.role = ctrl.entities.roles[i];
        }
      }

    });
  }

  // Maak nieuwe resource
  this.create = function() {
    var account = angular.copy(ctrl.model.account);
    account.role = account.role.key;

    Accounts.create({}, account).$promise.then(function(response) {
      $location.path('/admin/accounts');
    });
  };

  // Save de bewerkte resource
  this.update = function() {
    var account = angular.copy(ctrl.model.account);
    account.role = account.role.key;

    Accounts.update({id : ctrl.id}, account).$promise.then(function() {
      $location.path('/admin/accounts');
    });
  };

  // Verwijder de resource
  this.delete = function() {
    Accounts.delete({id : ctrl.id}, ctrl.model.account).$promise.then(function() {
      $location.path('/admin/accounts');
    });
  };


});
