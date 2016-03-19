'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('WorksheetDetails', function ($q, $resource, $routeParams, $location, $filter, $interval, Worksheets, Visits, Addresses) {

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

  ctrl.init();

  /**
   * Worksheet Class
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

  Worksheet.prototype.getTotalNumberOfAddresses = function() {
    var groups = this.groups,
        totalNumberOfAddresses = 0;

    for (var i=0; i<groups.length; i++) {
      totalNumberOfAddresses += groups[i].addresses.length;
    }

    return totalNumberOfAddresses;
  };

  Worksheet.prototype.getNumberOfAddressesLeft = function() {
    var groups = this.groups,
      totalNumberOfAddressesLeft = 0;

    for (var i=0; i<groups.length; i++) {
      totalNumberOfAddressesLeft += groups[i].getNumberOfEditableAddresses();
    }

    return totalNumberOfAddressesLeft;
  };

  Worksheet.prototype.getNumberOfAbsentsByIteration = function(iteration) {
    var groups = this.groups,
      totalNumberOfAbsents = 0;

    for (var i=0; i<groups.length; i++) {
      var addresses = groups[i].addresses;

      for (var j=0; j<addresses.length; j++) {
        if (angular.isDefined(addresses[j].visits) && angular.isDefined(addresses[j].visits[iteration-1])) {
          if (!addresses[j].visits[iteration-1].success) {
            totalNumberOfAbsents++;
          }
        }
      }
    }

    return totalNumberOfAbsents;
  };

	/**
   * WorksheetGroup class
   * @param group
   * @constructor
   */

  function WorksheetGroup(group) {
    this.street = group.street;
    this.addresses = this.parseAddresses(group.addresses);
    this.menuOpen = false;
  }

  WorksheetGroup.prototype.parseAddresses = function (addresses) {
    for (var i=0; i<addresses.length; i++) {
      addresses[i] = new WorksheetAddress(addresses[i]);
    }
    return addresses;
  };

  WorksheetGroup.prototype.toggleMenu = function() {
    this.menuOpen = !this.menuOpen;
  };

  WorksheetGroup.prototype.isMenuOpen = function() {
    return this.menuOpen;
  };

  WorksheetGroup.prototype.decrementNumber = function(number, times) {

    if(number - times > 0) {
      return +number - times;
    }
    else {
      return 1;
    }
  };

  WorksheetGroup.prototype.incrementNumber = function(number, times) {
    if(isNaN(number) || number <= 0) {
      return 1;
    }
    else {
      return (+number + times);
    }
  };

  WorksheetGroup.prototype.addAddress = function(number, addition) {
    console.log(number, this.street.id, ctrl.worksheet.area.id);

    var address = {
      number: number,
      street: 'streets/' + this.street.id,
      area: 'areas/' + ctrl.worksheet.area.id
    };


    Addresses.create({}, address).$promise.then(function (response) {
      console.log(response);
    });


  };

	/**
   * Count number of open addresses
   */
  WorksheetGroup.prototype.getNumberOfEditableAddresses = function () {
    var openAddresses = 0;

    for (var i=0; i<this.addresses.length; i++) {
      if (this.addresses[i].isEditable()) {
        openAddresses++;
      }
    }

    return openAddresses;
  };

	/**
   * WorksheetAddress object
   * @param address
   * @constructor
   */
  function WorksheetAddress(address) {
    this.id = address.id;
    this.number = address.number;
    this.visits = address.visits;
    this.menuOpen = false;
  }

  /**
   * Register a visit
   */
  WorksheetAddress.prototype.createVisit = function (success) {
    var address = this;

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

  WorksheetAddress.prototype.toggleMenu = function() {
    this.menuOpen = !this.menuOpen;
  };

  WorksheetAddress.prototype.isMenuOpen = function() {
    return this.menuOpen;
  };

  WorksheetAddress.prototype.isVisited = function () {
    return (angular.isDefined(this.visits) && this.visits.length > 0);
  };

  /**
   * Address should be visible when:
   * 1) Address is not visited yet in the first iteration
   * 2) Address is visited in the current iteration
   * @param address
   * @returns {boolean}
   */
  WorksheetAddress.prototype.isVisible = function () {
    var lastVisit = this.getLastVisit();

    if (lastVisit === null && ctrl.worksheet.iteration === 1) {
      return true;
    }

    if (lastVisit !== null && (lastVisit.iteration === ctrl.worksheet.iteration)) {
      return true;
    }

    if (lastVisit !== null && (lastVisit.iteration === ctrl.worksheet.iteration - 1) && !this.isSuccess()) {
      return true;
    }

    return false;
  };

  /**
   * State and display of addresses
   */

  WorksheetAddress.prototype.isEditable = function () {
    var lastVisit;

    if (!angular.isDefined(this.visits) && angular.equals(ctrl.worksheet.iteration, 1)) {
      return true;
    }
    else if (!angular.isDefined(this.visits)) {
      return false;
    }

    lastVisit = this.getLastVisit();

    return (!lastVisit.success && (lastVisit.iteration < ctrl.worksheet.iteration));

  };

  WorksheetAddress.prototype.isSuccess = function () {
    if (!angular.isDefined(this.visits)) {
      return false;
    }
    else {
      var lastVisit = this.visits[this.visits.length-1];

      return lastVisit.success;
    }

  };

  WorksheetAddress.prototype.getLastVisit = function() {
    if (angular.isDefined(this.visits) && this.visits.length > 0) {
      return this.visits[this.visits.length - 1];
    }
    else {
      return null;
    }
  };

});
