'use strict';

angular.module('fieldserviceFeApp').controller('ModalInstanceCtrl', function ($uibModalInstance, worksheet, content) {

  var ctrl = this;

  ctrl.worksheet = worksheet;
  ctrl.content = content;

  ctrl.ok = function () {
    $uibModalInstance.close(true);
  };

  ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
