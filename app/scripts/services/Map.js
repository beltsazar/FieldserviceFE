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

  Map.prototype.initialize = function () {

    this.map = L.map(this.mapId, {
      center: [config.maps.center.lat, config.maps.center.lng],
      zoom: config.maps.center.zoom,
      scrollWheelZoom: false
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      opacity: 1,
      detectRetina: true,
      reuseTiles: true
    }).addTo(this.map);

    return this;
  };

  Map.prototype.createEditLayer = function (geoJsonString) {

    var map = this.map,
      editLayer;

    if (angular.isDefined(geoJsonString)) {
      editLayer = L.geoJson(JSON.parse(geoJsonString), {
        //style: function (feature) {
        //  return {};
        //},
        onEachFeature: function (feature, layer) {
          layer.bindPopup('<h5>Gebied ' + 'nog doen' + '</h5>');

          /**
           * Check if there is a Point (Marker) Object and center the map accordingly
           */
          if (angular.equals(feature.geometry.type, 'Point')) {
            map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 18);
          }

        }
      });
    }
    else {
      editLayer = new L.FeatureGroup();
    }

    editLayer.setStyle(config.maps.defaultStyle);

    editLayer.addTo(map);

    return editLayer;
  };

  Map.prototype.createEditor = function (editLayer, contentUpdateHandler) {
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
        layer.setStyle(config.maps.defaultStyle);
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
