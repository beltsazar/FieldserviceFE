'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('ReportDetails', function ($q, $resource, $routeParams, $location, $filter, $interval, Addresses, Reports, Visits) {

  var ctrl = this,
      report;

  ctrl.model = {
    report: {},
    sheets: []
  };

  ctrl.id = $routeParams.id;

	/**
   * Initialize
   */
  ctrl.init = function () {

    ctrl.getReport().$promise.then(function (response) {
      ctrl.model.report = response;

      $q.all([ctrl.getAddresses(ctrl.model.report.area.id).$promise, ctrl.getVisits(ctrl.id).$promise]).then(function(response) {
        report = new Canvas(response[0]._embedded.addresses, response[1]._embedded.visits);
        // expose sheets property to model
        ctrl.model.sheets = report.sheets;
      });

    });

    //$interval(function() {
    //  ctrl.getAddresses().$promise.then(function (response) {
    //    workSheet.addAddressesToSheets(response._embedded.addresses);
    //  });
    //},3000);
  };


  ctrl.openMenu = function(context) {
    context.isMenuOpen = !context.isMenuOpen;
  };

  ctrl.addVisit = function(address, success) {
    ctrl.createVisit(address, success);
  };

  ctrl.isVisitEnabled = function (address) {

    var numberOfVisits = address.visits.length,
        iteration = ctrl.model.report.iteration;

    // If no visits are found at all, the visit should be enabled
    if(numberOfVisits === 0) {
      return true;
    }

    // If the last visit is unsuccesfull AND in a previous iteration, it should be enabled
    if(numberOfVisits > 0 && address.visits[numberOfVisits - 1].success === false && address.visits[numberOfVisits - 1].iteration < iteration) {
      return true;
    }

    // If there is a visit with a success state, it should be disabled
    //for (var i = 0; i < address.visits.length; i++) {
    //  if(address.visits[i].success === true) {
    //    return false;
    //  }
    //}




    return false;

  };


  ctrl.isVisitSuccess = function (address, iteration) {

    if(address.visits.length === 0) {
      return false;
    }
    else {
      for(var i=0; i<address.visits.length; i++) {
        if(address.visits[i].success) {
          return true;
        }
      }
      return false;
    }

  };


  ctrl.getAddressCurrentIterationVisitState = function(address, iteration) {
      for(var i=0; i<address.visits.length; i++) {
        if(angular.equals(address.visits[i].iteration, iteration)) {
          return address.visits[i].success;
        }
      }

  };

  /**
   * Get the report itself
   */
  ctrl.getReport = function () {
    return Reports.get({id: ctrl.id, projection: 'entities'});
  };

  /**
   * Get the related visits by current report
   */
  ctrl.getVisits = function (reportId) {
    return Visits.findByReport({
      report: 'reports/' + reportId,
      projection: 'entities',
      sort: ['address.id', 'iteration'],
      size: 1000
    });
  };

	/**
   * Get the related addresses
   */
  ctrl.getAddresses = function (areaId) {
    return Addresses.findByArea({
      area: 'areas/' + areaId,
      projection: 'entities',
      sort: ['street.name', 'number']
    });
  };

  /**
   * Register a visit
   */
  ctrl.createVisit = function (address, success) {
    Visits.add({}, {
      address: 'addresses/' + address.id,
      report: 'reports/' + ctrl.model.report.id,
      success: success,
      iteration: ctrl.model.report.iteration
    }).$promise.then(function(response) {
      address.visits.push(response);
    });
  };

  /**
   * Create worksheet and group by streets
   */

  function Canvas(addresses, visits) {
    this.addresses = addresses;
    this.visits = visits;
    this.sheets = [];
    this.sheetIndex = {};

    this.createSheets();
    this.addAddressesToSheets();
    this.addVisitsToAddresses();

  }

  Canvas.prototype.createSheets = function() {
    var sheet = this.addresses[0].street,
        index = 0;
    this.createSheet(sheet, index++);

    for(var i=1; i < this.addresses.length; i++) {
      sheet = this.addresses[i].street;
      if(!angular.equals(this.addresses[i-1].street.id, sheet.id)) {
        this.createSheet(sheet, index++);
      }
    }
  };

  Canvas.prototype.createSheet = function(sheet, index) {
    this.sheets.push(new Sheet(sheet));
    this.sheetIndex[sheet.id] = index++;
  };

  Canvas.prototype.addVisitsToAddresses = function() {
    var addressMap = {};

    // Make map of addresses and add an empty visits collection to address
    for(var i=0; i<this.addresses.length; i++) {
      addressMap[this.addresses[i].id] = this.addresses[i];
      this.addresses[i].visits = [];
    }

    // If there are visits, add them to visits property of address
    if(angular.isDefined(this.visits)) {

      // Loop through all visits' address objects
      for (var j = 0; j < this.visits.length; j++) {
        var visitAddress = this.visits[j].address,
          address;

        // If a visited address is found, try to find it in the map of actual addresses
        if (visitAddress !== null) {
          address = addressMap[visitAddress.id];

          // If a matching address is found in map, add the visit to this addresses visits collection
          if (angular.isDefined(address)) {
            address.visits.push(this.visits[j]);
          }
        }

      }
    }

  };


  Canvas.prototype.addAddressesToSheets = function() {
    var id,
        sheetIndex;

    for(var j=0; j < this.sheets.length; j++) {
      this.sheets[j].addresses = [];
    }

    for(var i=0; i < this.addresses.length; i++) {
      id = this.addresses[i].street.id;
      sheetIndex = this.sheetIndex[id];

      this.sheets[sheetIndex].addresses.push(this.addresses[i]);

    }
  };

  function Sheet(street) {
    this.id = street.id;
    this.name = street.name;
    this.badges = {
      todo: 0
    };
    this.addresses = [];
  }

  ctrl.init();

});
