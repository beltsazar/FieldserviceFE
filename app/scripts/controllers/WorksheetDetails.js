'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('WorksheetDetails', function ($q, $resource, $routeParams, $location, $filter, $interval, Worksheet, Worksheets) {

  var ctrl = this;

  ctrl.id = $routeParams.id;
  ctrl.worksheet = {};

	/**
   * Initialize
   */
  ctrl.init = function () {

    Worksheets.get({id: ctrl.id}).$promise.then(function(response) {
      ctrl.worksheet = new Worksheet(response);

      //$interval(function() {
      //  Worksheets.get({id: ctrl.id}).$promise.then(function(response) {
      //    ctrl.worksheet = response;
      //    });
      //  },1000);

    });

  };

  ctrl.init();

});
