'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('CityList', function (Cities, $resource, $routeParams) {

  var ctrl = this;

  ctrl.cities = [];

  /**
   * Get shapes from Nominatim:
   * http://nominatim.openstreetmap.org/search?city=Monnickendam&country=The%20Netherlands&format=json&polygon_geojson=1
   *
   * Returns array of OSM objects with embedded geojson
   */
  
  Cities.query({
    sort: ['name,asc']
  }).$promise.then(function(result) {
    ctrl.cities = result;
  });

});
