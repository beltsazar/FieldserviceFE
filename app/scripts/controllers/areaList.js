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

  ctrl.shapes = [];

  /**
   * Initialise Leaflet map
   * @param geoJSON
   */



  Areas.query({sort : 'number', projection: 'entities'}).$promise.then(function(result) {
    var areas = result,
        shapes = [];

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
