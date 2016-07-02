'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AccountList', function (Accounts, $resource, $routeParams) {

  var ctrl = this;

  ctrl.accounts = [];


  Accounts.query({
    sort: ['lastName,asc']
  }).$promise.then(function(result) {
    ctrl.accounts = result;
  });

});
