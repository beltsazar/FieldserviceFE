'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('WorksheetDetails', function ($scope, $q, $uibModal, $resource, $routeParams, $location, $filter, $interval, Worksheet, Worksheets, Assignments) {

  var ctrl = this,
      interval;

  ctrl.id = $routeParams.id;
  ctrl.worksheets = [];
  ctrl.isListView = false;
  ctrl.isDialogOpen = false;
  ctrl.mapOptions = {
    scrollWheelZoom: false,
    touchZoom: true,
    dragging: true
  };

	/**
   * Initialize
   */
  ctrl.init = function () {

    Worksheets.get({
      id: ctrl.id,
      mode: 'view'}).$promise.then(function(response) {
        ctrl.worksheets.push(new Worksheet(response));

      interval = $interval(function () {
        if (!ctrl.isDialogOpen) {
          ctrl.worksheets[0].refresh();
        }
      }, 20000);
    });

  };

  ctrl.init();

  /**
   * Confirmation Modal
   * @param worksheet
   * @returns {*}
     */
  ctrl.confirm = function (content, worksheet, callback, callbackArgs) {

    ctrl.isDialogOpen = true;

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
      ctrl.isDialogOpen = false;
    }, function () {
      ctrl.isDialogOpen = false;
      /* TODO: ? */
    });

    return modalInstance.result;
  };

  $scope.$on('$destroy', function () {
     if (angular.isDefined(interval)) {
       $interval.cancel(interval);
     }
  });

});
