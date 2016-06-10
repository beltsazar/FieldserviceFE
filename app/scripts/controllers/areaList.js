/* global L */
'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaList', function (Campaigns, Areas, ViewAreas) {

  var ctrl = this;

  ctrl.areas = [];
  ctrl.shapes = [];

  ctrl.campaigns = [{
    id: undefined,
    name: '-- All Campaigns --'
  }];
  ctrl.types = [
    { id: undefined, name: '-- All Types --' },
    { id: 'PRIVATE', name: 'Private' },
    { id: 'BUSINESS', name: 'Business' }
  ]

  ctrl.model = {
    type: ctrl.types[0],
    selectedCampaign: {},
    creationDate: undefined,
    creationDateDisabled: 'disabled'
  };

  ctrl.getCampaigns = function () {

    Campaigns.query({
      sort: ['active,desc','name,asc']
    }).$promise.then(function(result) {
      Array.prototype.push.apply(ctrl.campaigns, result);
      ctrl.model.selectedCampaign = ctrl.campaigns[1];

      ctrl.getAreas();
    });

  };

  /**
   * Initialise Leaflet map
   * @param geoJSON
   */

  ctrl.getAreas = function () {
    var params = {
      type: ctrl.model.type.id,
      campaign: ctrl.model.selectedCampaign.id,
      date: ctrl.model.creationDate
    };

    ViewAreas.query(params).$promise.then(function (result) {
      var shapes = [],
        areas = result;

      if (areas.length > 0) {

        angular.forEach(areas, function (area) {

          if (angular.isDefined(area.shape)) {
            var geoJsonObject = JSON.parse(area.shape);

            /**
             * Enrich Json object with area properties
             */
            angular.forEach(geoJsonObject.features, function (feature) {
              feature.properties = {
                label: area.number + ' <span class="label label-default">' + area.assignments.length + '</span>',
                popup: '<a href="#/admin/areas/' + area.id + '"><b>' + area.city.name + ' ' + area.number + '</b></a>'
              };
            });

            shapes.push(geoJsonObject);
          }
        });

        ctrl.areas = result;
        ctrl.shapes = shapes;
      }

    });
  };

  ctrl.getCampaigns();

});
