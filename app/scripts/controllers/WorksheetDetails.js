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

  ctrl.items = ['item1', 'item2', 'item3'];

  ctrl.animationsEnabled = true;

  ctrl.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: ctrl.animationsEnabled,
      templateUrl: 'myModalContent.html',
      bindToController: true,
      controller: 'ModalInstanceCtrl',
      controllerAs: 'ctrl',
      size: size,
      resolve: {
        items: function () {
          return ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  ctrl.toggleAnimation = function () {
    ctrl.animationsEnabled = !ctrl.animationsEnabled;
  };


});

angular.module('fieldserviceFeApp').controller('ModalInstanceCtrl', function ($uibModalInstance, items) {

  var ctrl = this;

  console.log(items)

  ctrl.items = items;
  ctrl.selected = {
    item: ctrl.items[0]
  };

  ctrl.ok = function () {
    $uibModalInstance.close(ctrl.selected.item);
  };

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
