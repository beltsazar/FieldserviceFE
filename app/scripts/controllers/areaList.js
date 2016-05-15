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
    var map = new Map('AreaOverview');

    angular.forEach(ctrl.areas, function (area) {
      map.getLayer(area.shape, {
        label: area.number,
        popup: '<a href="#/admin/areas/' + area.id + '"><b>' + area.city.name + ' ' + area.number + '</b></a>'
      });
    });

  }

  Areas.query({sort : 'number', projection: 'entities'}).$promise.then(function(result) {
    ctrl.areas = result;
    initializeMap();
  });

});
