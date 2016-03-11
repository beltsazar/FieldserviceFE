'use strict';

fdescribe('Controller: WorksheetDetails', function () {

  var scope, httpBackend, createController;

  beforeEach(module('fieldserviceFeApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, config) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    config.api.hostname = '';

    var routeParamsMock = {
      id: 100
    };

    createController = function() {
      return $controller('WorksheetDetails', {
        $scope: scope,
        $routeParams: routeParamsMock
      });
    };

  }));

  describe('The display of the addresses during the first iteration (1)', function () {

    beforeEach(function () {
      httpBackend.whenGET('/worksheets/100').respond(200, workSheetsMock.iteration1);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should load the worksheet entity', function () {
      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.worksheet).toBeDefined();
      expect(ctrl.worksheet.id).toBe(100);
      expect(ctrl.worksheet.iteration).toBe(1);
      expect(ctrl.worksheet.area.id).toBe(39);
    });

    it('should load the worksheet sheets', function () {
      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.worksheet.groups.length).toBe(3);
      expect(ctrl.worksheet.groups[0].street.name).toBe('Bereklauw');
      expect(ctrl.worksheet.groups[0].addresses.length).toBe(3);
      expect(ctrl.worksheet.groups[1].street.name).toBe('Houtrib');
      expect(ctrl.worksheet.groups[1].addresses.length).toBe(5);
      expect(ctrl.worksheet.groups[2].street.name).toBe('Zwaluwtong');
      expect(ctrl.worksheet.groups[2].addresses.length).toBe(8);
    });

    it('should determine the visit state of the address (no visits yet)', function () {

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.worksheet.groups[0].addresses[0].visits).not.toBeDefined();
      expect(ctrl.worksheet.groups[0].addresses[1].visits.length).toBe(1);
      expect(ctrl.worksheet.groups[0].addresses[2].visits.length).toBe(1);

      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[0])).toBeTruthy();
      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[2])).toBeTruthy();

      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[2])).toBeTruthy();

      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[0])).toBeTruthy();
      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[1])).toBeFalsy();
      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[2])).toBeFalsy();

      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[1])).toBeFalsy();
      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[2])).toBeTruthy();

    });

  });

  describe('The display of the addresses during the second iteration (2)', function () {

    beforeEach(function () {
      //httpBackend.whenGET('/worksheets/100').respond(200, workSheetsMock.iteration1);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should load the worksheet entity', function () {
      httpBackend.whenGET('/worksheets/100').respond(200, workSheetsMock.iteration1);

      var ctrl = createController();
      httpBackend.flush();

      ctrl.worksheet.iteration=2;

      expect(ctrl.worksheet).toBeDefined();
      expect(ctrl.worksheet.id).toBe(100);
      expect(ctrl.worksheet.iteration).toBe(2);
      expect(ctrl.worksheet.area.id).toBe(39);
    });

    it('should determine the initial visit state of the address when loading the previous iteration (1)', function () {
      httpBackend.whenGET('/worksheets/100').respond(200, workSheetsMock.iteration1);
      var ctrl = createController();
      httpBackend.flush();

      ctrl.worksheet.iteration=2;

      expect(ctrl.worksheet.groups[0].addresses[0].visits).not.toBeDefined();
      expect(ctrl.worksheet.groups[0].addresses[1].visits.length).toBe(1);
      expect(ctrl.worksheet.groups[0].addresses[2].visits.length).toBe(1);

      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[2])).toBeFalsy();

      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[2])).toBeTruthy();

      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[2])).toBeFalsy();

      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[1])).toBeFalsy();
      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[2])).toBeTruthy();

    });

    it('should determine the visit state of the address when loading the current iteration (2)', function () {
      httpBackend.whenGET('/worksheets/100').respond(200, workSheetsMock.iteration2);
      var ctrl = createController();
      httpBackend.flush();

      ctrl.worksheet.iteration=2;

      expect(ctrl.worksheet.groups[0].addresses[0].visits).not.toBeDefined();
      expect(ctrl.worksheet.groups[0].addresses[1].visits.length).toBe(2);
      expect(ctrl.worksheet.groups[0].addresses[2].visits.length).toBe(1);

      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[2])).toBeFalsy();

      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[2])).toBeTruthy();

      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[1])).toBeFalsy();
      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[2])).toBeFalsy();

      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[1])).toBeFalsy();
      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[2])).toBeTruthy();

    });

  });

  describe('The display of the addresses during the third iteration (3)', function () {

    beforeEach(function () {
      //httpBackend.whenGET('/worksheets/100').respond(200, workSheetsMock.iteration1);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should load the worksheet entity', function () {
      httpBackend.whenGET('/worksheets/100').respond(200, workSheetsMock.iteration1);

      var ctrl = createController();
      httpBackend.flush();

      ctrl.worksheet.iteration=3;

      expect(ctrl.worksheet).toBeDefined();
      expect(ctrl.worksheet.id).toBe(100);
      expect(ctrl.worksheet.iteration).toBe(3);
      expect(ctrl.worksheet.area.id).toBe(39);
    });

    it('should determine the initial visit state of the address when loading the previous iteration (1)', function () {
      httpBackend.whenGET('/worksheets/100').respond(200, workSheetsMock.iteration2);
      var ctrl = createController();
      httpBackend.flush();

      ctrl.worksheet.iteration=3;

      expect(ctrl.worksheet.groups[0].addresses[0].visits).not.toBeDefined();
      expect(ctrl.worksheet.groups[0].addresses[1].visits.length).toBe(2);
      expect(ctrl.worksheet.groups[0].addresses[2].visits.length).toBe(1);

      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[2])).toBeFalsy();

      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[2])).toBeTruthy();

      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[2])).toBeFalsy();

      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[1])).toBeFalsy();
      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[2])).toBeTruthy();

    });

    it('should determine the visit state of the address when loading the current iteration (3)', function () {
      httpBackend.whenGET('/worksheets/100').respond(200, workSheetsMock.iteration3);
      var ctrl = createController();
      httpBackend.flush();

      ctrl.worksheet.iteration=3;

      expect(ctrl.worksheet.groups[0].addresses[0].visits).not.toBeDefined();
      expect(ctrl.worksheet.groups[0].addresses[1].visits.length).toBe(3);
      expect(ctrl.worksheet.groups[0].addresses[2].visits.length).toBe(1);

      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisible(ctrl.worksheet.groups[0].addresses[2])).toBeFalsy();

      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisited(ctrl.worksheet.groups[0].addresses[2])).toBeTruthy();

      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[1])).toBeFalsy();
      expect(ctrl.isEditable(ctrl.worksheet.groups[0].addresses[2])).toBeFalsy();

      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[0])).toBeFalsy();
      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[1])).toBeTruthy();
      expect(ctrl.isSuccess(ctrl.worksheet.groups[0].addresses[2])).toBeTruthy();

    });

  });




});
