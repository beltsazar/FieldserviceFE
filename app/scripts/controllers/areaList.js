/* global L */
'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaList', function (config, Campaigns, Areas, ViewAreas) {

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

    if (!angular.isDefined(ctrl.model.selectedCampaign.id) && angular.isDefined(params.date) && params.date.length > 0) {
      var splittedDate = ctrl.model.creationDate.split('-');
      params.date = splittedDate[2] + '-' + splittedDate[1] + '-' + splittedDate[0] + 'T00:00:00.001';
    }
    else {
      delete params.date;
    }


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
              var assignments = area.assignments,
                  style,
                  popupText;

              popupText = '<p class="m-b-5"><a href="#/admin/areas/' + area.id + '"><b>' + area.city.name + ' ' + area.number + '</b></a></p>';

              if (assignments.length > 0 && assignments[0].active) {
                var elapsedTimeFromCreation = moment(assignments[0].creationDate).fromNow(true),
                    account = assignments[0].account;

                assignments[0].elapsedTimeFromCreation = elapsedTimeFromCreation;
                style = config.map.styles.warning;

                if(angular.isDefined(account)) {
                  var accountName = '';
                  accountName += angular.isDefined(account.firstName) ? account.firstName : ' ';
                  accountName += angular.isDefined(account.infix) ? account.infix : ' ';
                  accountName += angular.isDefined(account.lastName) ? account.lastName : ' ';

                  popupText += '<p class="m-t-0 m-b-5">Administrator: <b>' + accountName + '</b></p>';
                }

                popupText += '<p class="m-t-0 m-b-5">Started: <b>' + elapsedTimeFromCreation + '</b> geleden</p>';
              }
              else if (assignments.length > 0 && !assignments[0].active) {
                style = config.map.styles.success;
                popupText += '<p class="m-t-0 m-b-5">Completed: <b>' + moment(assignments[0].closeDate).fromNow(true) + '</b> geleden</p>';
              }
              else {
                style = config.map.styles.waiting;
              }

              popupText += '<p class="m-t-0 m-b-5">Assignments: <b>' + assignments.length + '</b></p>';

              feature.properties = {
                label: '<span class="area">' + area.number + '</span> <span class="number">' + area.assignments.length + '</span>',
                popup: popupText,
                style: style
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
