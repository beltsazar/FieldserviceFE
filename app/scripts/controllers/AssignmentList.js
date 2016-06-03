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

  ctrl.model = {
    selectedCampaign: {},
    active: true,
    sort: ['area.city.name,asc', 'area.number,asc']
  };
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
      ctrl.model.selectedCampaign = ctrl.campaigns[0];
      ctrl.getAssignments();
    });

  };

  ctrl.getAssignments = function () {

    Assignments.findByCampaignAndActive({
      campaign: '/campaigns/' + ctrl.model.selectedCampaign.id,
      active: ctrl.model.active,
      projection: 'entities',
      sort: ctrl.model.sort,
      page: (ctrl.page.number - 1),
      size: ctrl.page.size
    }).$promise.then(function(result) {
      ctrl.assignments = result[0];
      ctrl.page = result[1];
      ctrl.page.number++;
    });

  };

  ctrl.sortByProperty = function (propertyName) {
    var sort = ctrl.model.sort[0].split(','),
        sortProperty = sort[0],
        sortOrder = sort[1];

    if (angular.equals(sortProperty,propertyName)) {

      if (angular.equals(sortOrder, 'asc')) {
        ctrl.model.sort[0] = sortProperty + ',desc';
      }
      else {
        ctrl.model.sort[0] = sortProperty + ',asc';
      }

    }
    else {
      ctrl.model.sort = [propertyName + ',asc'];

      if (angular.equals(propertyName, 'area.city.name')) {
        ctrl.model.sort.push('area.number,asc');
      }
    }

    ctrl.getAssignments();
  };

  ctrl.getCampaigns();

});
