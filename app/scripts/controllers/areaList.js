/* global L */
'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AreaList', function ($http, $scope, $timeout, $filter, config, Campaigns, Areas, ViewAreas, Cities, MapService) {

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
    creationDate: moment().subtract(1, 'years').format("DD-MM-YYYY"),
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

              popupText = '<p class="m-b-5"><a href="#/admin/areas/' + area.id + '"><b>' + $filter('displayAreaName')(area) + '</b></a></p>';

              if (assignments.length > 0 && assignments[0].active) {
                var elapsedTimeFromCreation = moment(assignments[0].creationDate).fromNow(true),
                    account = assignments[0].account;

                assignments[0].elapsedTimeFromCreation = elapsedTimeFromCreation;
                style = config.map.styles.warning;

                if(angular.isDefined(account)) {
                  var accountName = '';
                  accountName += angular.isDefined(account.firstName) ? account.firstName + ' ' : ' ';
                  accountName += angular.isDefined(account.infix) ? account.infix + ' ' : ' ';
                  accountName += angular.isDefined(account.lastName) ? account.lastName + ' ' : ' ';

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

              if (assignments.length === 0 || assignments.length > 0 && !assignments[0].active) {
                var createAssignmentLink = '#/admin/assignments/create?areaId=' + area.id;
                popupText +=  '<p class="m-t-0 m-b-5" style="margin-left:-15px"><a href="' + createAssignmentLink + ' "><b><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> Create assignment</b></a></p>';
              }

              /**
               * Show area on map
               */

              var areaLabel = '<span class="area">' + area.number + '</span><span class="area-type">' + $filter('displayAreaNameType')(area) + '</span><span class="number">' + area.assignments.length + '</span>'

              if (assignments.length > 0 && assignments[0].active && assignments[0].personal) {
                areaLabel += '<span class="type"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></span>';
              }

              feature.properties = {
                label: areaLabel,
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

  $scope.$watch(function () {
      return MapService.mapObject;
    }, function(mapObject) {
      if(mapObject !== null) {
        initMapLayers(mapObject);
      }
    });

  function initMapLayers(mapObject) {
    var control = L.control.layers({'OSM Map': mapObject.osmLayer}).addTo(mapObject.map);

    Cities.query({
      sort: ['name,asc']
    }).$promise.then(function(cities) {
      angular.forEach(cities, function (city) {
        if (angular.isDefined(city.shape)) {
          city.shape = JSON.parse(city.shape);
          addCityLayer(city);
        }
      });
    });

    function addCityLayer(city) {
      var cityLayer = L.geoJson(undefined, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker([latlng.lat, latlng.lng]);
        }
      });

     for( var i=0; i<city.shape.length; i++) {
      cityLayer.addData(city.shape[i].geojson);
     }

     cityLayer.addTo(mapObject.map);
     cityLayer.bringToBack();
     cityLayer.setStyle(config.map.styles.city)
     control.addOverlay(cityLayer, city.name);
    }

  }

  ctrl.getCampaigns();

});





