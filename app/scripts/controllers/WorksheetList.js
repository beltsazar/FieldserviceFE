'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('WorksheetList', function ($q, $resource, $routeParams, $location, $filter, $interval, Worksheet, Worksheets) {

  var ctrl = this;

  ctrl.worksheets = [];
  ctrl.isListView = true;

	/**
   * Initialize
   */
  ctrl.init = function () {

    Worksheets.query({
      mode: 'view',
      filter: ['shared','active','campaign']}).$promise.then(function(response) {

      angular.forEach(response, function(value) {
        ctrl.worksheets.push(new Worksheet(value));
      });

    });

  };

  ctrl.init();

});
