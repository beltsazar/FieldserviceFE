'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('WorksheetListAdmin', function ($q, $resource, $routeParams, $location, $filter, $interval, Worksheet, Worksheets) {

  var ctrl = this;

  ctrl.worksheets = [];
  ctrl.isListView = true;
  ctrl.adminMode = true;
  ctrl.filterOptions = {
    campaign: true,
    active: true,
    shared: false
  };

	/**
   * Initialize
   */
  ctrl.loadWorksheets = function () {

    ctrl.filter = [];

    if(ctrl.filterOptions.campaign) {
      ctrl.filter.push('campaign');
    }

    if(ctrl.filterOptions.active) {
      ctrl.filter.push('active');
    }

    if(ctrl.filterOptions.shared) {
      ctrl.filter.push('shared');
    }

    Worksheets.query({
      mode: 'view',
      filter: ctrl.filter}).$promise.then(function(response) {

        ctrl.worksheets = [];

        angular.forEach(response, function(value) {
          ctrl.worksheets.push(new Worksheet(value));
        });

    });

  };

  ctrl.loadWorksheets();

});
