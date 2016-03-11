'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('WorksheetDetails', function ($q, $resource, $routeParams, $location, $filter, $interval, Worksheets, Visits) {

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


  ctrl.openMenu = function(context) {
    context.isMenuOpen = !context.isMenuOpen;
  };

  ctrl.addVisit = function(address, success) {
    ctrl.createVisit(address, success);
  };


  /**
   * Register a visit
   */
  ctrl.createVisit = function (address, success) {

    Visits.add({}, {
      address: 'addresses/' + address.id,
      worksheet: 'worksheets/' + ctrl.worksheet.id,
      success: success,
      iteration: ctrl.worksheet.iteration
    }).$promise.then(function(response) {
      if (!angular.isDefined(address.visits)) {
        address.visits = [];
      }

      address.visits.push(response);
    });
  };

	/**
   * State and display of addresses
   */

	/**
   * Address should be visible when:
   * 1) Address is not visited yet in the first iteration
   * 2) Address is visited in the current iteration
   * @param address
   * @returns {boolean}
   */
  ctrl.isVisible = function (address) {
    var lastVisit = getLastVisit(address);

    if (lastVisit === null && ctrl.worksheet.iteration === 1) {
      return true;
    }

    if (lastVisit !== null && (lastVisit.iteration === ctrl.worksheet.iteration)) {
      return true;
    }

    if (lastVisit !== null && (lastVisit.iteration === ctrl.worksheet.iteration - 1) && !ctrl.isSuccess(address)) {
      return true;
    }

    return false;
  };

  ctrl.isVisited = function (address) {
    if (angular.isDefined(address.visits) && address.visits.length > 0) {
      return true;
    }

    return false;
  };

  ctrl.isEditable = function (address) {
    var lastVisit;

    if (!angular.isDefined(address.visits) && angular.equals(ctrl.worksheet.iteration, 1)) {
      return true;
    }
    else if (!angular.isDefined(address.visits)) {
      return false;
    }

    lastVisit = getLastVisit(address);

    if (!lastVisit.success && (lastVisit.iteration < ctrl.worksheet.iteration)) {
      return true;
    }


    return false;
  };

  ctrl.isSuccess = function (address) {
    if (!angular.isDefined(address.visits)) {
      return false;
    }
    else {
      var lastVisit = address.visits[address.visits.length-1];

      return lastVisit.success;
    }

  };

  function getLastVisit(address) {
    if (angular.isDefined(address.visits) && address.visits.length > 0) {
      return address.visits[address.visits.length - 1];
    }
    else {
      return null;
    }
  }

  /**
   * Create worksheet and group by streets
   */

  function Worksheet(data) {
    this.id = data.id;
    this.active = data.active;
    this.iteration = data.iteration;
    this.area = data.area;
    this.groups = this.createGroups(data.groups);
  }

  Worksheet.prototype.createGroups = function(groups) {
    var groupList = [];

    for (var i=0; i<groups.length; i++) {
      groupList.push(new WorksheetGroup(groups[i]));
    }

    return groupList;
  };

  function WorksheetGroup(group) {
    this.street = group.street;
    this.addresses = group.addresses;
  }

  ctrl.init();

});
