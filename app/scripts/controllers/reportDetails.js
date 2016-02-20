'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('ReportDetails', function ($resource, $routeParams, $location, $filter, $interval, Areas, Addresses, Reports) {

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
      ctrl.getAddresses(ctrl.model.report.area.id).$promise.then(function (response) {
        report = new Canvas(response._embedded.addresses);
        ctrl.model.sheets = report.sheets;
      });
    });

    //$interval(function() {
    //  ctrl.getAddresses().$promise.then(function (response) {
    //    workSheet.fillSheets(response._embedded.addresses);
    //  });
    //},3000);
  };

  /**
   * Get the report
   */
  ctrl.getReport = function () {
    return Reports.get({id: ctrl.id, projection: 'entities'});
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

  function Canvas(addresses) {
    this.addresses = addresses;
    this.sheets = [];
    this.sheetIndex = {};

    this.createSheets();
    this.fillSheets(this.addresses);
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

  Canvas.prototype.fillSheets = function(addresses) {
    var id,
        sheetIndex;

    this.addresses = addresses;

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

  ctrl.createCanvas = function (addresses) {

    var canvas = [];

    var sheets = {};
    var sheetIndex = 0;

    var name = addresses[0].street.name;

    canvas.push({ group: { name: name}});
    sheets[name] = sheetIndex++;

    for(var i=1; i < addresses.length; i++) {

      if(!angular.equals(addresses[i-1].street.name, addresses[i].street.name)) {
        name = addresses[i].street.name;
        canvas.push({ group: { name: name}});
        sheets[name] = sheetIndex++;
      }

    }

    console.log(canvas)
    console.log(sheets)

    return canvas;

  };

  /**
   * Split addresses into streets and make into worksheet
   */
  ctrl.updateCanvas = function (addresses) {
    var canvas = [];

    var previousStreet = null,
        currentStreet = null;

    var rowNumber = -1,
        itemNumber = 0;

    for(var i=0; i < addresses.length; i++)  {

      currentStreet = addresses[i].street.name;

      if(!angular.equals(previousStreet, currentStreet)) {
        itemNumber=0;
        console.log(++rowNumber + '-' + itemNumber++ + '-' + currentStreet);
        canvas.push([]);
      }
      else {
        console.log(rowNumber + '-' + itemNumber++ + '-' + currentStreet);
      }

      canvas[rowNumber].push(addresses[i]);

      previousStreet = currentStreet;

    }

    console.log('--------------')

    console.log(canvas);

    return canvas;

  };

  ctrl.init();

});
