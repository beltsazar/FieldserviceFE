/* global L */
'use strict';

/**
 * @ngdoc directive
 * @name fieldserviceFeApp.directive:isActiveMenu
 * @description
 * # isActiveMenu
 */
angular.module('fieldserviceFeApp')
  .directive('map', function ($timeout, $http, config, MapService) {

    /**
     * Map object
     * @param mapId
     * @constructor
     */
    function Map(mapId) {
      this.map = undefined;
      this.osmLayer = undefined;
      this.locationLayer = undefined;
      this.mapId = mapId;
      this.initialize();
    }

    /**
     * Initialize map
     * @returns {Map}
     */
    Map.prototype.initialize = function () {
      var scope = this;

      // Initialize map with defaults
      this.map = L.map(this.mapId, {
        center: [config.map.center.lat, config.map.center.lng],
        zoom: config.map.center.zoom,
        //scrollWheelZoom: false,
        fullscreenControl: true
      });

      scope.adjustZoomStyling();

      this.osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 19,
        opacity: 1,
        detectRetina: true,
        reuseTiles: true
      });

      this.osmLayer.addTo(this.map);

      this.map.locate({
        watch: true,
        enableHighAccuracy: true
      });

      this.map.on('locationfound', function (e) {
        scope.showLocation (e, scope);
      });

      this.map.on('zoomend', function (e) {
        scope.adjustZoomStyling();
      });

      return this;
    };

    Map.prototype.showLocation = function (locationevent) {
      var radius = locationevent.accuracy / 2;
      this.setLocationLayer(locationevent.latlng, radius);
    };

    Map.prototype.setLocationLayer = function (latlng, radius) {
      if (angular.isDefined(this.locationLayer)) {
        this.map.removeLayer(this.locationLayer);
      }

      this.locationLayer = L.featureGroup();

      L.circleMarker(latlng, {
        radius: 2,
        color: 'red',
        fillOpacity: 0.5,
        weight: 2
      }).addTo(this.locationLayer);

      L.circle(latlng, radius, {
        color: 'red',
        weight: 1
      }).addTo(this.locationLayer);

      this.map.addLayer(this.locationLayer);
    };

    /**
     * Zoom handler
     * @param map
     */
    Map.prototype.adjustZoomStyling = function (map) {
      var mapElement = angular.element('div#' + this.mapId);

      mapElement.removeClass(function () {
        var elementsToRemove = '';
        for (var i = 1; i <= 19; i++) {
          elementsToRemove += 'zoom-' + i + ' ';
        }
        return elementsToRemove;
      });

      angular.element('div#' + this.mapId).addClass('zoom-' + this.map.getZoom());
    };

    Map.prototype.getFeatureGroup = function () {
      var featureGroup = new L.FeatureGroup();
      featureGroup.setStyle(config.map.styles.default);
      return featureGroup;
    };

    Map.prototype.focusLayer = function (layer) {
      var bounds = layer.getBounds();
      if (bounds.isValid()) {
        this.map.fitBounds(bounds);
      }
    }

    Map.prototype.getGeoJsonLayer = function () {

      var geoJsonLayer = L.geoJson(undefined, {
        style: function(feature) {
          if (angular.isDefined(feature.properties.style)) {
            return feature.properties.style;
          }
          else {
            return config.map.styles.default;
          }
        },
        onEachFeature: function (feature, layer) {
          var popup = feature.properties.popup;
          if (popup) {
            layer.bindPopup(popup);
          }
        },
        pointToLayer: function (feature, latlng) {
          var options = {},
            label = feature.properties.label;

          if (angular.isDefined(label)) {
            options.icon = L.divIcon({
              className: 'area-div-icon',
              iconSize: null,
              html: label
            });
          }

          return L.marker([latlng.lat, latlng.lng], options);
        }
      });

      //geoJsonLayer.setStyle(config.map.styles.warning);

      return geoJsonLayer;
    };

    Map.prototype.getSimpleGeoJsonLayer = function (geoJsonObject) {
      var geoJsonLayer = L.geoJson(geoJsonObject);
      geoJsonLayer.setStyle(config.map.styles.default);
      return geoJsonLayer;
    }

    Map.prototype.getEditor = function (editLayer, contentUpdateHandler) {
      var map = this.map;

      var drawControl = new L.Control.Draw({
        edit: {
          featureGroup: editLayer,
          edit: {}
        },
        draw: {}
      });

      map.addControl(drawControl);

      map.on('draw:created', function (e) {
        var layer = e.layer;
        if (angular.isDefined(layer.setStyle)) {
          layer.setStyle(config.map.styles.default);
        }
        editLayer.addLayer(layer);
        contentUpdateHandler(editLayer.toGeoJSON());
      });

      map.on('draw:edited draw:deleted', function (e) {
        contentUpdateHandler(editLayer.toGeoJSON());
      });

    };

    /**
     * Controller
     * @param $scope
     */
    var mapController = function ($scope) {
      var ctrl = this,
          mapObject,
          shapeLayer;

      $scope.$watch('ctrl.shape', function (shape) {
        if (angular.isDefined(shape)) {
          if(angular.equals(ctrl.mode, 'edit')) {
            initEditor(shape);
          }
          else {
            var shapes = [];
            shapes.push(shape);
            initShapes(shapes);
          }
        }
      });

      $scope.$watch('ctrl.shapes', function (shapes) {
        if (angular.isDefined(shapes) && shapes.length > 0) {
          initShapes(shapes);
        }
      });

      $scope.$on('$destroy', function() {
        mapObject.map.remove();
      });

      function initShapes (shapes) {
        mapObject = getMap(mapObject);
        shapeLayer = mapObject.getGeoJsonLayer();

        for(var i=0; i<shapes.length; i++) {
          shapeLayer.addData(shapes[i]);
        }

        mapObject.focusLayer(shapeLayer);
        shapeLayer.addTo(mapObject.map);
      }

      function initEditor (geoJsonObject) {
        var editorLayer;

        mapObject = getMap(mapObject);

        if (angular.equals(geoJsonObject.type, 'FeatureCollection')) {
          editorLayer = mapObject.getSimpleGeoJsonLayer(geoJsonObject);
        }
        else {
          editorLayer = mapObject.getFeatureGroup();
        }

        mapObject.focusLayer(editorLayer);
        editorLayer.addTo(mapObject.map);

        mapObject.getEditor(editorLayer, function (geoJsonObject) {
          ctrl.shape = angular.copy(geoJsonObject);
          $scope.$apply();
        });

      }

      function getMap (mapObject) {
        if (angular.isDefined(mapObject)) {

          if (angular.isDefined(shapeLayer) && !angular.equals(ctrl.mode, 'edit')) {
            mapObject.map.removeLayer(shapeLayer);
            return mapObject;
          }
          else {
            mapObject.map.remove();
            return new Map(ctrl.id);
          }
        }
        else {
          var newMap = new Map(ctrl.id);
          MapService.resolve(newMap);
          return newMap;
        }
      }
    };

    /**
     * Configuration
     */
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        shape: '=',
        shapes: '=',
        mode: '@',
        id: '@'
      },
      controller: mapController,
      controllerAs: 'ctrl'
    };

  }).factory('MapService', function ($resource, config, $q) {

  return $q.defer();

});




