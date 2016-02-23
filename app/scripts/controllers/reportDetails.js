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

        ctrl.visits = response[1];

      });

    });

    //$interval(function() {
    //  ctrl.getAddresses().$promise.then(function (response) {
    //    workSheet.addAddressesToSheets(response._embedded.addresses);
    //  });
    //},3000);
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
      sort: ['addressId', 'iteration']
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

    for(var i=0; i<this.addresses.length; i++) {
      addressMap[this.addresses[i].id] = this.addresses[i];
      this.addresses[i].visits = [];
    }

    for(var j=0; j<this.visits.length; j++) {
      var visitAddress = this.visits[j].address,
          address;

      if(visitAddress !== null) {
        address = addressMap[visitAddress.id];

        if(angular.isDefined(address)) {
          address.visits.push(this.visits[j]);
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
