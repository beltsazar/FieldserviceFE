/* global L */
'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaDetails', function ($scope, $resource, $routeParams, $location, $filter, Areas, Addresses, Cities, Assignments, Map) {

  var ctrl = this;

  ctrl.model = {
    area: {}
  };

  ctrl.entities = {
    assignments: [],
    addresses: [],
    cities: []
  };

  ctrl.id = $routeParams.id;

	/**
   * Initialise Leaflet map
   * @param geoJsonString
   */

  function initializeMap (geoJsonString) {
    var editMap = new Map('MapEditor');

    var editLayer = editMap.getLayer(geoJsonString, {
      label: ctrl.model.area.number,
      popup: '<a href="#/admin/areas/' + ctrl.model.area.id + '"><b>' + ctrl.model.area.city.name + ' ' + ctrl.model.area.number + '</b></a>'
    });

    editMap.map.fitBounds(editLayer.getBounds());

    var editor = editMap.getEditor(editLayer, function contentUpdateHandler (e) {
      ctrl.model.area.shape = editLayer.toGeoJSON();
    });

  }

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

    Areas.create({}, ctrl.model.area).$promise.then(function(response) {

      Areas.updateEntity({
        id: response.id,
        entity: 'city' }, '/cities/' + ctrl.model.area.city.id).$promise.then(function () {
      });

    });
  };

  // Save de bewerkte resource
  this.update = function() {

    var area = {
      number: ctrl.model.area.number,
      shape: ctrl.model.area.shape
    };

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

      initializeMap(ctrl.model.area.shape);
      ctrl.getAssignments();
      ctrl.getAddresses();

    });
  }
  else {
    initializeMap();
  }

  // Get all the cities
  ctrl.getCities();

});
