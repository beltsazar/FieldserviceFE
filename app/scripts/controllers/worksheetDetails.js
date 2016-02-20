'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:ArealistCtrl
 * @description
 * # ArealistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('WorksheetDetails', function ($resource, $routeParams, $location, $filter, $interval, Areas, Addresses) {

  var ctrl = this,
      workSheet;

  ctrl.model = {
    area: {},
    sheets: []
  };

  ctrl.entities = {
    addresses: []
  };

  ctrl.id = $routeParams.id;

	/**
   * Initialize
   */
  ctrl.init = function () {

    ctrl.getArea();
    ctrl.getAddresses().$promise.then(function (response) {
      workSheet = new WorkSheet(response._embedded.addresses);
      ctrl.model.sheets = workSheet.sheets;
    });

    //$interval(function() {
    //  ctrl.getAddresses().$promise.then(function (response) {
    //    workSheet.fillSheets(response._embedded.addresses);
    //  });
    //},3000);
  };

  /**
   * Get the area
   */
  ctrl.getArea = function () {
    Areas.get({id: ctrl.id}).$promise.then(function (response) {
      ctrl.model.area = response;
    });
  };

	/**
   * Get the related addresses
   */
  ctrl.getAddresses = function () {
    return Addresses.findByArea({
      area: 'areas/' + ctrl.id,
      projection: 'entities',
      sort: ['city.name', 'street.name', 'number']
    });
  };

	/**
   * Create worksheet and group by streets
   */

  function WorkSheet(addresses) {
    this.addresses = addresses;
    this.sheets = [];
    this.sheetIndex = {};

    this.createSheets();
    this.fillSheets(this.addresses);
  }

  WorkSheet.prototype.createSheets = function() {
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

  WorkSheet.prototype.createSheet = function(sheet, index) {
    this.sheets.push(new Sheet(sheet));
    this.sheetIndex[sheet.id] = index++;
  };

  WorkSheet.prototype.fillSheets = function(addresses) {
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

  ctrl.createWorksheet = function (addresses) {

    var workSheet = [];

    var groups = {};
    var groupIndex = 0;

    var name = addresses[0].street.name;

    workSheet.push({ group: { name: name}});
    groups[name] = groupIndex++;

    for(var i=1; i < addresses.length; i++) {

      if(!angular.equals(addresses[i-1].street.name, addresses[i].street.name)) {
        name = addresses[i].street.name;
        workSheet.push({ group: { name: name}});
        groups[name] = groupIndex++;
      }

    }

    console.log(workSheet)
    console.log(groups)

    return workSheet;

  };



  /**
   * Split addresses into streets and make into worksheet
   */
  ctrl.updateWorksheet = function (addresses) {
    var workSheet = [];

    var previousStreet = null,
        currentStreet = null;

    var rowNumber = -1,
        itemNumber = 0;

    for(var i=0; i < addresses.length; i++)  {

      currentStreet = addresses[i].street.name;

      if(!angular.equals(previousStreet, currentStreet)) {
        itemNumber=0;
        console.log(++rowNumber + '-' + itemNumber++ + '-' + currentStreet);
        workSheet.push([]);
      }
      else {
        console.log(rowNumber + '-' + itemNumber++ + '-' + currentStreet);
      }

      workSheet[rowNumber].push(addresses[i]);

      previousStreet = currentStreet;

    }

    console.log('--------------')

    console.log(workSheet);

    return workSheet;

  };

  ctrl.init();

});
