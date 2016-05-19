/* global L */
'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaList', function (Areas, Map) {

  var ctrl = this;

  ctrl.areas = [];

  /**
   * Initialise Leaflet map
   * @param geoJSON
   */

  function initializeMap () {
    var areaMap = new Map('AreaOverview');

    var geoJsonLayer = new L.GeoJSON(undefined, {
      onEachFeature: function (feature, layer) {
        var popup = '<a href="#/admin/areas/' + feature.properties.id + '"><b>' + feature.properties.city + ' ' + feature.properties.number + '</b></a>';
        layer.bindPopup(popup);
      },
      pointToLayer: function (feature, latlng) {
        var options = {
          icon : L.divIcon({
            className: 'area-div-icon',
            iconSize: null,
            html: feature.properties.number
          })
        };
        return L.marker([latlng.lat, latlng.lng], options);
      }
    });

    angular.forEach(ctrl.areas, function (area) {

      if(angular.isDefined(area.shape)) {
        var geoJsonObject = JSON.parse(area.shape);

		  /**
		   * Enrich Json object with area properties
       */
      angular.forEach(geoJsonObject.features, function (feature) {
          feature.properties = {
            id: area.id,
            type: area.type,
            number: area.number,
            city: area.city.name
          };
        });

        geoJsonLayer.addData(geoJsonObject);
      }
    });

    var bounds = geoJsonLayer.getBounds();
    if(bounds.isValid()) {
      areaMap.map.fitBounds(bounds);
    }

    areaMap.map.addLayer(geoJsonLayer);

  }

  Areas.query({sort : 'number', projection: 'entities'}).$promise.then(function(result) {
    ctrl.areas = result;

    if (ctrl.areas.length > 0) {
      initializeMap();
    }
  });

});
