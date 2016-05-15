/* global L */

'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').service('Map', function (Application, config) {

  function Map(mapId) {
    this.mapId = mapId;
    this.initialize();
  }

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

    console.log(this.map)
  };

  Map.prototype.initialize = function () {
    var scope = this;

    this.map = L.map(this.mapId, {
      center: [config.map.center.lat, config.map.center.lng],
      zoom: config.map.center.zoom,
      //scrollWheelZoom: false,
      fullscreenControl: true
    });

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
   * getLayer
   * @param geoJsonString
   * @param options {center: true|false, label: String, popup: String
   * @returns {*}
   */
  Map.prototype.getLayer = function (geoJsonString, options) {

    var map = this.map,
        center = angular.isDefined(options) && options.center || false,
        label = angular.isDefined(options) && options.label,
        popup = angular.isDefined(options) && options.popup,
        editLayer;

    if (angular.isDefined(geoJsonString)) {
      editLayer = L.geoJson(JSON.parse(geoJsonString), {
        //style: function (feature) {
        //  return {};
        //},
        pointToLayer: function(feature, latlng) {
          var options = {};

          if (center) {
            map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 18);
          }

          if (angular.isDefined(label)) {
            options.icon = L.divIcon({className: 'area-div-icon', iconSize: null, html: label});
          }

          return L.marker([latlng.lat, latlng.lng], options);
        },
        onEachFeature: function (feature, layer) {
          if (angular.isDefined(popup)) {
            layer.bindPopup(popup);
          }
        }
      });
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
      contentUpdateHandler(e);
    });

    map.on('draw:edited draw:deleted', function (e) {
      contentUpdateHandler(e);
    });

  };

  return Map;

});
