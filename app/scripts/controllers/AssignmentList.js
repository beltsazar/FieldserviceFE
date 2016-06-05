'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('AssignmentList', function ($scope, Campaigns, Assignments) {

  var ctrl = this;

  ctrl.model = {
    selectedCampaign: {},
    active: true,
    sort: ['area.city.name,asc', 'area.number,asc'],
    creationDate: undefined,
    creationDateDisabled: 'disabled'
  };
  ctrl.campaigns = [{
    id: undefined,
    name: '-- All Campaigns --'
  }];
  ctrl.assignments = [];

  ctrl.page = {
    number: 1,
    size: 10
  };

  ctrl.getCampaigns = function () {

    Campaigns.query({
      sort: ['active,desc','name,asc']
    }).$promise.then(function(result) {
      Array.prototype.push.apply(ctrl.campaigns, result);
      ctrl.model.selectedCampaign = ctrl.campaigns[1];
      ctrl.getAssignments();
    });

  };

  function getCreationDate() {
    var creationDate = ctrl.model.creationDate;

    return '2016-04-09T00:00:00.001';
    return '2016-04-09T22:13:34.065';

    if (angular.isDefined(creationDate)) {
      var splittedDate = creationDate.split('-');
      return moment(splittedDate[2] + '-' + splittedDate[1] + '-' + splittedDate[0]).format('YYYY-MM-DDTHH:mm:ss.SSS');
    }
    else {
      return undefined;
    }

  }

  $scope.$watch('ctrl.model', function(model) {

    if(angular.isDefined(model.selectedCampaign.id) || angular.isDefined(model.active)) {
      ctrl.model.creationDateDisabled = 'disabled';
    }
    else {
      ctrl.model.creationDateDisabled = undefined;
    }

  }, true);

  ctrl.getAssignments = function () {
    var queryParams = {
      projection: 'entities',
      sort: ctrl.model.sort,
      page: (ctrl.page.number - 1),
      size: ctrl.page.size
    };

    if (angular.isDefined(ctrl.model.selectedCampaign.id) && angular.isDefined(ctrl.model.active)) {
      queryParams.search = 'search';
      queryParams.findBy = 'findByCampaignAndActive';
      queryParams.campaign = '/campaigns/' + ctrl.model.selectedCampaign.id;
      queryParams.active = ctrl.model.active;
    }
    else if (angular.isDefined(ctrl.model.selectedCampaign.id)) {
      queryParams.search = 'search';
      queryParams.findBy = 'findByCampaign';
      queryParams.campaign = '/campaigns/' + ctrl.model.selectedCampaign.id;
    }
    else if (angular.isDefined(ctrl.model.active)) {
      queryParams.search = 'search';
      queryParams.findBy = 'findByActive';
      queryParams.active = ctrl.model.active;
    }
    else if (angular.isDefined(ctrl.model.creationDate) && ctrl.model.creationDate.length > 0) {
      var splittedDate = ctrl.model.creationDate.split('-');
      queryParams.search = 'search';
      queryParams.findBy = 'findByCreationDateGreaterThan';
      queryParams.date = splittedDate[2] + '-' + splittedDate[1] + '-' + splittedDate[0] + 'T00:00:00.001';
    }
    else {}

    Assignments.query(queryParams).$promise.then(function(result) {
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
