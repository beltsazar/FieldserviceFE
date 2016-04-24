/* global moment */
'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Worksheet', function (Worksheets, Addresses, Visits, Assignments) {

  /**
   * Worksheet Class
   */

  function Worksheet(data) {
    this.initialize(data);
  }

  Worksheet.prototype.initialize = function(data) {
    this.id = data.id;
    this.iteration = data.iteration;
    this.creationDate = data.creationDate;
    this.closeDate = data.closeDate;
    this.area = data.assignment.area;
    this.assignment = data.assignment;
    this.groups = this.createGroups(data.groups);
    this.summary = this.getIterationSummary();
  };

  Worksheet.prototype.createGroups = function(groups) {
    var groupList = [];

    for (var i=0; i<groups.length; i++) {
      groupList.push(new WorksheetGroup(groups[i], this));
    }

    return groupList;
  };

  Worksheet.prototype.refresh = function() {
    var groups = this.groups;

    Worksheets.get({
      id: this.id,
      mode: 'view'
    }).$promise.then(function(response) {

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

    var enrichedDateList = [];

    dateTimeStamps.sort();

    for (var i=0; i<dateTimeStamps.length; i++) {
      var date = dateTimeStamps[i].split('T')[0],
        thisMoment = moment(dateTimeStamps[i]),
        partOfDay;

      /**
       * part of day
       * 1) morning: 6:00 - 12:00
       * 2) afternoon: 12:00 - 17:00
       * 3) evening: 17:00 - 6:00
       */

      if (thisMoment.isBetween(date + 'T06:00:00.000', date + 'T12:00:00.000', 'minute')) {
        partOfDay = 1;
      }
      else if (thisMoment.isBetween(date + 'T12:00:00.000', date + 'T17:00:00.000', 'minute')) {
        partOfDay = 2;
      }
      else {
        partOfDay = 3;
      }

      var bucket = {
        date: date,
        dayOfWeek: thisMoment.weekday(),
        partOfDay: partOfDay,
        daysFromNow: thisMoment.fromNow()
      };

      bucket.hashKey = ('hash#' + bucket.date + bucket.partOfDay).replace(/\s/g,'');

      enrichedDateList.push(bucket);
    }

    var hashedBucketList = {};

    for(var j=0; j<enrichedDateList.length; j++) {
      hashedBucketList[enrichedDateList[j].hashKey] = enrichedDateList[j];
    }

    var bucketList = [];

    angular.forEach(hashedBucketList, function(value) {
      bucketList.push(value);
    });

    bucketList.sort(function(item1, item2) {

      if (item1.date < item2.date) {
        return -1;
      }

      if (item1.date > item2.date) {
        return 1;
      }

      if (item1.date === item2.date) {

        if (item1.partOfDay < item2.partOfDay) {
          return -1;
        }

        if (item1.partOfDay > item2.partOfDay) {
          return 1;
        }

      }

      return 0;
    });

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

  Worksheet.prototype.newIteration = function () {
    var worksheet = this;
    worksheet.iteration++;
    worksheet.assignment = 'assignment/' + worksheet.assignment.id;

    Worksheets.update({id: worksheet.id}, worksheet).$promise.then(function(response) {

      Worksheets.get({
        id: worksheet.id,
        mode: 'view'
      }).$promise.then(function(response) {
        worksheet.initialize(response);
      });

    });
  };

  Worksheet.prototype.closeWorksheet = function () {
    var worksheet = this,
        assignment = angular.copy(worksheet.assignment);
    worksheet.active = false;
    worksheet.closeDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS');
    worksheet.assignment = 'assignment/' + worksheet.assignment.id;

    Worksheets.update({id: worksheet.id}, worksheet).$promise.then(function() {
      assignment.active = false;
      assignment.closeDate = worksheet.closeDate;
      assignment.area = '/areas/' + assignment.area.id;
      assignment.account = '/accounts/' + assignment.account.id;

      Assignments.update({id : assignment.id}, assignment).$promise.then(function() {

        Worksheets.get({
          id: worksheet.id,
          mode: 'view'
        }).$promise.then(function(response) {
          worksheet.initialize(response);
        });
      });

    });
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
