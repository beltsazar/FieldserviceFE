'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('WorksheetDetails', function ($q, $resource, $routeParams, $location, $filter, $interval, Worksheet, Worksheets, Assignments) {

  var ctrl = this;

  ctrl.id = $routeParams.id;
  ctrl.worksheets = [];
  ctrl.isListView = false;

	/**
   * Initialize
   */
  ctrl.init = function () {

    Worksheets.get({
      id: ctrl.id,
      mode: 'view'}).$promise.then(function(response) {
        ctrl.worksheets.push(new Worksheet(response));
    });

  };

  ctrl.init();

});
