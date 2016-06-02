'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AssignmentList', function (Campaigns, Assignments) {

  var ctrl = this;

  ctrl.selectedCampaign = {};
  ctrl.campaigns = [];
  ctrl.assignments = [];

  ctrl.page = {
    number: 1,
    size: 10
  };

  ctrl.getCampaigns = function () {

    Campaigns.query({
      sort: ['active,desc','name,asc']
    }).$promise.then(function(result) {
      ctrl.campaigns = result;
      ctrl.selectedCampaign = ctrl.campaigns[0];
      ctrl.getAssignments();
    });

  };


  ctrl.getAssignments = function () {

    Assignments.findByCampaign({
      campaign: '/campaigns/' + ctrl.selectedCampaign.id,
      projection: 'entities',
      sort: ['active,desc', 'creationDate,asc'],
      page: (ctrl.page.number - 1),
      size: ctrl.page.size
    }).$promise.then(function(result) {
      ctrl.assignments = result[0];
      ctrl.page = result[1];
      ctrl.page.number++;
    });

  };

  ctrl.getCampaigns();


  //ctrl.getAssignments();

});
