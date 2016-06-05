/* global L */
'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaList', function (Areas) {

  var ctrl = this;

  ctrl.areas = [];
  ctrl.shapes = [];

  /**
   * Initialise Leaflet map
   * @param geoJSON
   */

  Areas.query({
    projection: 'assignments',
    sort : ['city.name,asc','number,asc'],
    size: 1000000
  }).$promise.then(function(result) {
    var shapes = [],
        areas = result;

    ctrl.areas = result;

    if (areas.length > 0) {

        angular.forEach(areas, function (area) {

          if(angular.isDefined(area.shape)) {
            var geoJsonObject = JSON.parse(area.shape);

            /**
             * Enrich Json object with area properties
             */
            angular.forEach(geoJsonObject.features, function (feature) {
              feature.properties = {
                label: area.number,
                popup:  '<a href="#/admin/areas/' + area.id+ '"><b>' + area.city.name + ' ' + area.number + '</b></a>'
              };
            });

            shapes.push(geoJsonObject);
          }
        });

      ctrl.shapes = shapes;
      }

  });

});
