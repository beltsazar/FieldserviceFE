/* global L */
'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaDetails', function ($scope, $timeout, $resource, $routeParams, $location, $filter, Areas, Addresses, Cities, Assignments, Map) {

  var ctrl = this;

  ctrl.model = {
    area: {}
  };

  ctrl.entities = {
    assignments: [],
    addresses: [],
    cities: [],
    types: [
      {
        key: 'PRIVATE',
        label: 'Private'
      },
      {
        key: 'BUSINESS',
        label: 'Business'
      }
    ]
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

  // Get the related addresses
  this.getAssignments = function() {
    Assignments.findByArea({
      area: 'areas/' + ctrl.id,
      //projection: 'entities',
      sort: ['active,desc', 'creationDate']}).$promise.then(function (response) {
      ctrl.entities.assignments = response;
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
    var area = {
      number: ctrl.model.area.number,
      shape: ctrl.model.area.shape,
      type: ctrl.model.area.type.key
    };

    if (!angular.equals(ctrl.model.area.shape.type, 'FeatureCollection')) {
      delete area.shape;
    }

    Areas.create({}, area).$promise.then(function(response) {

      Areas.updateEntity({
        id: response.id,
        entity: 'city' }, '/cities/' + ctrl.model.area.city.id).$promise.then(function () {
          $location.path('/admin/areas/' + response.id);
      });

    });
  };

  // Save de bewerkte resource
  this.update = function() {

    var area = {
      number: ctrl.model.area.number,
      shape: ctrl.model.area.shape,
      type: ctrl.model.area.type.key
    };

    if (!angular.equals(ctrl.model.area.shape.type, 'FeatureCollection')) {
      delete area.shape;
    }

    Areas.update({id : ctrl.id}, area).$promise.then(function() {

      Areas.updateEntity({
        id: ctrl.id,
        entity: 'city' }, '/cities/' + ctrl.model.area.city.id).$promise.then(function () {
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

      for(var i=0; i<ctrl.entities.types.length; i++) {
        if (angular.equals(ctrl.entities.types[i].key, ctrl.model.area.type)) {
          ctrl.model.area.type = ctrl.entities.types[i];
        }
      };

      if (angular.isDefined(ctrl.model.area.shape)) {
        ctrl.model.area.shape = JSON.parse(ctrl.model.area.shape);

        /**
         * Enrich Json object with area properties
         */
        angular.forEach(ctrl.model.area.shape.features, function (feature) {
          feature.properties = {
            label: ctrl.model.area.number,
            popup:  '<a href="#/admin/areas/' + ctrl.model.area.id+ '"><b>' + ctrl.model.area.city.name + ' ' + ctrl.model.area.number + '</b></a>'
          };
        });

      }
      else {
        ctrl.model.area.shape = {};
      }

      ctrl.getAssignments();
      ctrl.getAddresses();

    });
  }
  else {
    ctrl.model.area.shape = {};
  }

  // Get all the cities
  ctrl.getCities();

});
