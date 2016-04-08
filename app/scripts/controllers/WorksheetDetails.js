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
  ctrl.worksheet = {};

	/**
   * Initialize
   */
  ctrl.init = function () {

    Worksheets.get({
      id: ctrl.id,
      mode: 'view'}).$promise.then(function(response) {
      ctrl.worksheet = new Worksheet(response);

      //$interval(function() {
      //  Worksheets.get({id: ctrl.id}).$promise.then(function(response) {
      //    ctrl.worksheet = response;
      //    });
      //  },1000);

    });

  };

  ctrl.newIteration = function () {
    ctrl.worksheet.iteration++;
    ctrl.worksheet.assignment = 'assignment/' + ctrl.worksheet.assignment.id;

    Worksheets.update({id: ctrl.worksheet.id}, ctrl.worksheet).$promise.then(function() {
      ctrl.init();
    });
  };

  ctrl.closeWorksheet = function () {
    var assignment = angular.copy(ctrl.worksheet.assignment);
    ctrl.worksheet.active = false;
    ctrl.worksheet.closeDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    ctrl.worksheet.assignment = 'assignment/' + ctrl.worksheet.assignment.id;

    Worksheets.update({id: ctrl.worksheet.id}, ctrl.worksheet).$promise.then(function() {
      assignment.active = false;
      assignment.closeDate = ctrl.worksheet.closeDate;
      assignment.area = '/areas/' + assignment.area.id;

      Assignments.update({id : assignment.id}, assignment).$promise.then(function() {
        ctrl.init();
      });

    });
  };

  ctrl.init();

});
