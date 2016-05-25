'use strict';

/**
 * @ngdoc directive
 * @name fieldserviceFeApp.directive:isActiveMenu
 * @description
 * # isActiveMenu
 */
angular.module('fieldserviceFeApp')
  .directive('map', function ($timeout, config) {

	  /**
     * Map object
     * @param mapId
     * @constructor
     */
    function Map(mapId) {
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

      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 19,
        opacity: 1,
        detectRetina: true,
        reuseTiles: true
      }).addTo(this.map);

      this.map.on('zoomend', function(e) {
        scope.adjustZoomStyling();
      });

      return this;
    };

	  /**
     * Zoom handler
     * @param map
     */
    Map.prototype.adjustZoomStyling = function(map) {
      var mapElement = angular.element('div#' + this.mapId);

      mapElement.removeClass(function() {
        var elementsToRemove = '';
        for (var i=1; i<=19; i++) {
          elementsToRemove += 'zoom-' + i + ' ';
        }
        return elementsToRemove;
      });

      angular.element('div#' + this.mapId).addClass('zoom-' + this.map.getZoom());
    };

    /**
     * getLayer
     * @param geoJson
     * @param options {center: true|false, label: String, popup: String }
     * @returns {*}
     */
    Map.prototype.getLayer = function (geoJson, options) {

      var map = this.map,
        editLayer;

      if (angular.isDefined(geoJson)) {

        editLayer = L.geoJson(geoJson, {
          onEachFeature: function (feature, layer) {
            var popup = feature.properties.popup;
            if(popup) {
              layer.bindPopup(popup);
            }
          },
          pointToLayer: function(feature, latlng) {
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



        //if(autoZoom) {
          var bounds = editLayer.getBounds();
          if(bounds.isValid()) {
            map.fitBounds(bounds);
          }
        //}
      }
      else {
        editLayer = new L.FeatureGroup();
      }

      editLayer.setStyle(config.map.styles.default);

      editLayer.addTo(map);

      return editLayer;
    };

    Map.prototype.getEditor = function (editLayer, contentUpdateHandler) {
      var map = this.map;

      var drawControl = new L.Control.Draw({
        edit: {
          featureGroup: editLayer,
          edit: {
          }
        },
        draw: {}
      });

      map.addControl(drawControl);

      map.on('draw:created', function (e) {
        var layer = e.layer;
        if(angular.isDefined(layer.setStyle)) {
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
      var map,
          ctrl = this;

      $scope.$watch('ctrl.geoJsonObject', function (value ) {

        if(angular.isDefined(value) && !angular.isDefined(map)) {
          map = new Map(ctrl.id);

          //var geoJsonLayer = map.addGeoJsonLayer();


          var editLayer = map.getLayer(ctrl.geoJsonObject);

          var editor = map.getEditor(editLayer, function (geoJsonObject) {
            ctrl.geoJsonObject = geoJsonObject;
            $scope.$apply();
          });

        }

      });

    }

	  /**
     * Configuration
     */
    return {
      restrict: 'EA',
      scope: {},
      bindToController: {
        geoJsonObject: '=',
        mode: '@',
        id: '@'
      },
      controller: mapController,
      controllerAs: 'ctrl'
    };

  });




