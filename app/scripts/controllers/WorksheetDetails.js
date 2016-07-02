'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('WorksheetDetails', function ($q, $uibModal, $resource, $routeParams, $location, $filter, $interval, Worksheet, Worksheets, Assignments) {

  var ctrl = this;

  ctrl.id = $routeParams.id;
  ctrl.worksheets = [];
  ctrl.isListView = false;
  ctrl.mapOptions = {
    scrollWheelZoom: false,
    touchZoom: true,
    dragging: false
  };

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

  /**
   * Confirmation Modal
   * @param worksheet
   * @returns {*}
     */
  ctrl.confirm = function (content, worksheet, callback, callbackArgs) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/worksheet_modal.html',
      bindToController: true,
      controller: 'WorksheetModalInstanceCtrl',
      controllerAs: 'ctrl',
      size: 'lg',
      resolve: {
        worksheet: function () {
          return worksheet;
        },
        content: function () {
          return content;
        }
      }
    });

    modalInstance.result.then(function (result) {
      worksheet[callback].apply(worksheet, callbackArgs);
    }, function () {
      /* TODO: ? */
    });

    return modalInstance.result;
  };

});
