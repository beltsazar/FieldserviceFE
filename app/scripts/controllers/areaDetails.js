/* global L */
'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaDetails', function ($scope, $resource, $routeParams, $location, $filter, leafletData, Areas, Addresses, Cities, Assignments, config) {

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
   * Leaflet Map configuration
   */
  angular.extend($scope, {
    center: config.maps.center,
    defaults: {
      scrollWheelZoom: false,
      tileLayerOptions: {
        opacity: 1,
        detectRetina: true,
        reuseTiles: true
      }
    }
  });

	/**
   * Initialise Leaflet map
   * @param geoJSON
   */

  ctrl.initMap = function (geoJSON) {

    leafletData.getMap().then(function (map) {

      var editLayer, areaMarker;

      /**
       * Functions
       */
      function getEditLayer() {
        var editLayer;

        if (angular.isDefined(geoJSON)) {
          editLayer = L.geoJson(JSON.parse(geoJSON), {
            style: function (feature) {
              return {};
            },
            onEachFeature: function (feature, layer) {
              layer.bindPopup('<h5>Gebied ' + ctrl.model.area.number + '</h5>');

              /**
               * Check if there is a Point (Marker) Object and center the map accordingly
               */
              if (angular.equals(feature.geometry.type, "Point")) {
                areaMarker = layer;
                map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 18);
              }

            }
          });
        }
        else {
          editLayer = new L.FeatureGroup();
        }

        return editLayer;
      }

      /**
       * Initialise map
       */

      editLayer = getEditLayer();
      editLayer.setStyle(config.maps.defaultStyle);
      editLayer.addTo(map);
      if(angular.isDefined(areaMarker)) {
        areaMarker.openPopup();
      }

      var drawControl = new L.Control.Draw({
        edit: {
          featureGroup: editLayer,
          edit: {
            selectedPathOptions: config.maps.editStyle
          }
        },
        draw: {
          polygon: {
            shapeOptions: config.maps.editStyle
          }
        }
      });

      map.addControl(drawControl);

      map.on('draw:created', function (e) {
        var layer = e.layer;
        if(angular.isDefined(layer.setStyle)) {
          layer.setStyle(config.maps.defaultStyle);
        }
        editLayer.addLayer(layer);
        ctrl.model.area.shape = editLayer.toGeoJSON();
      });

      map.on('draw:edited draw:deleted', function (e) {
        ctrl.model.area.shape = editLayer.toGeoJSON();
      });

    });
  }

  //function addControls


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

      ctrl.initMap(ctrl.model.area.shape);
      ctrl.getAssignments();
      ctrl.getAddresses();

    });
  }
  else {
    ctrl.initMap();
  }

  // Get all the cities
  ctrl.getCities();

});
