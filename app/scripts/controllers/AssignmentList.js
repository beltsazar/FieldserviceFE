'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AssignmentList', function (Assignments) {

  var ctrl = this;

  ctrl.assignments = [];

  Assignments.query({
    projection: 'entities',
    sort: ['active,desc', 'creationDate']
  }).$promise.then(function(result) {
    ctrl.assignments = result;
  });

});
