'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Worksheet', function (Worksheets, Addresses, Visits) {

  /**
   * Worksheet Class
   */

  function Worksheet(data) {
    this.id = data.id;
    this.active = data.active;
    this.iteration = data.iteration;
    this.personal = data.personal;
    this.creationDate = data.creationDate;
    this.closeDate = data.closeDate;
    this.area = data.area;
    this.groups = this.createGroups(data.groups);
    this.summary = this.getIterationSummary();
  }

  Worksheet.prototype.createGroups = function(groups) {
    var groupList = [];

    for (var i=0; i<groups.length; i++) {
      groupList.push(new WorksheetGroup(groups[i], this));
    }

    return groupList;
  };

  Worksheet.prototype.refresh = function() {
    var groups = this.groups;

    Worksheets.get({id: this.id}).$promise.then(function(response) {
      for (var i=0; i<groups.length; i++) {
        groups[i].refresh(response.groups[i]);
      }
    });

  };

  Worksheet.prototype.getIterationSummary = function () {
    var iterationSummaryList = [];

    for (var i=1; i<=this.iteration; i++) {
      iterationSummaryList.push({
        iteration: i,
        visitDates: this.getDateTimeBuckets(this.getVisitDatesByIteration(i))
      });
    }

    return iterationSummaryList;
  };

  Worksheet.prototype.getDateTimeBuckets = function (dateTimeStamps) {
    return dateTimeStamps;
    var bucketList = [];

    for (var i=1; i<dateTimeStamps.length; i++) {
      var test;

      var bucket = {
        day: moment(dateTimeStamps[i]).format('dddd'),
        timeOfDay: m

      }

      bucketList.push(bucket);

    }

    return bucketList;

  };

  Worksheet.prototype.getVisitDatesByIteration = function (iteration) {
    var datesByIterationList = [];

    for (var i=0; i<this.groups.length; i++) {
      var visitDates = this.groups[i].getVisitDatesByIteration(iteration);

      for (var j=0; j<visitDates.length; j++) {
        datesByIterationList.push(visitDates[j]);
      }
    }

    return datesByIterationList;
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
   * @param worksheet
   * @constructor
   */

  function WorksheetGroup(group, worksheet) {
    this.worksheet = worksheet;
    this.street = group.street;
    this.addresses = this.parseAddresses(group.addresses);
    this.menuOpen = false;
  }

  WorksheetGroup.prototype.parseAddresses = function (addresses) {
    for (var i=0; i<addresses.length; i++) {
      addresses[i] = new WorksheetAddress(addresses[i],this.worksheet);
    }
    return addresses;
  };

  WorksheetGroup.prototype.getVisitDatesByIteration = function (iteration) {
    var datesByIterationList = [];

    for (var i=0; i<this.addresses.length; i++) {
      var address = this.addresses[i];

      if (angular.isDefined(address.visits)) {

        for (var j = 0; j < address.visits.length; j++) {
          var visit = address.visits[j];

          if (visit.iteration === iteration) {
            datesByIterationList.push(visit.creationDate);
          }
        }
      }
    }

    return datesByIterationList;
  };

  WorksheetGroup.prototype.refresh = function (group) {
    this.addresses = this.parseAddresses(group.addresses);
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

  WorksheetGroup.prototype.addAddress = function(number) {
    var worksheet = this.worksheet,
      address = {
        number: number,
        street: 'streets/' + this.street.id,
        area: 'areas/' + worksheet.area.id
      };

    Addresses.create({}, address).$promise.then(function () {
      worksheet.refresh();
    });

  };

  /**
   * Count number of open addresses
   */
  WorksheetGroup.prototype.getNumberOfEditableAddresses = function () {
    var openAddresses = 0;

    for (var i=0; i<this.addresses.length; i++) {
      if (this.addresses[i].isEditable() && this.addresses[i].isVisible()) {
        openAddresses++;
      }
    }

    return openAddresses;
  };

  /**
   * WorksheetAddress object
   * @param address
   * @param worksheet
   * @constructor
   */
  function WorksheetAddress(address, worksheet) {
    this.id = address.id;
    this.number = address.number;
    this.visits = address.visits;
    this.worksheet = worksheet;
    this.menuOpen = false;
  }

  /**
   * Register a visit
   */
  WorksheetAddress.prototype.createVisit = function (success) {
    var address = this;

    Visits.add({}, {
      address: 'addresses/' + address.id,
      worksheet: 'worksheets/' + address.worksheet.id,
      success: success,
      iteration: address.worksheet.iteration
    }).$promise.then(function(response) {
      if (!angular.isDefined(address.visits)) {
        address.visits = [];
      }

      address.visits.push(response);
      address.worksheet.summary = address.worksheet.getIterationSummary();
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
   * @returns {boolean}
   */
  WorksheetAddress.prototype.isVisible = function () {
    var lastVisit = this.getLastVisit();

    if (lastVisit === null && this.worksheet.iteration === 1) {
      return true;
    }

    if (lastVisit !== null && (lastVisit.iteration === this.worksheet.iteration)) {
      return true;
    }

    return (lastVisit !== null && (lastVisit.iteration === this.worksheet.iteration - 1) && !this.isSuccess());

  };

  /**
   * State and display of addresses
   */

  WorksheetAddress.prototype.isEditable = function () {
    var lastVisit;

    if (!angular.isDefined(this.visits) && angular.equals(this.worksheet.iteration, 1)) {
      return true;
    }
    else if (!angular.isDefined(this.visits)) {
      return false;
    }

    lastVisit = this.getLastVisit();

    return (!lastVisit.success && (lastVisit.iteration < this.worksheet.iteration));

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


  return Worksheet;

});
