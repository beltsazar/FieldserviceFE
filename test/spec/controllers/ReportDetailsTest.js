'use strict';

fdescribe('Controller: ReportDetails', function () {

  var scope, httpBackend, createController;

  beforeEach(module('fieldserviceFeApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, config) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    config.api.hostname = '';

    var routeParamsMock = {
      id: 100
    };

    httpBackend.whenGET(/\/addresses\/search\/findByArea.*/).respond(200, addressesMock.list);

    createController = function() {
      return $controller('ReportDetails', {
        $scope: scope,
        $routeParams: routeParamsMock
      });
    };

  }));

  describe('The loading of the first iteration (1)', function () {

    beforeEach(function () {
      httpBackend.whenGET('/reports/100?projection=entities').respond(200, reportsMock.iterationOne);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should load the report entity', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.none);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.model.report).toBeDefined();
      expect(ctrl.model.report.id).toBe(100);
      expect(ctrl.model.report.iteration).toBe(1);
      expect(ctrl.model.report.area.id).toBe(39);

    });

    it('should load the report sheets', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.none);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.model.sheets.length).toBe(3);
      expect(ctrl.model.sheets[0].name).toBe('Bereklauw');
      expect(ctrl.model.sheets[0].addresses.length).toBe(2);
      expect(ctrl.model.sheets[1].name).toBe('Houtrib');
      expect(ctrl.model.sheets[1].addresses.length).toBe(1);
      expect(ctrl.model.sheets[2].name).toBe('Zwaluwtong');
      expect(ctrl.model.sheets[2].addresses.length).toBe(2);

    });

    it('should add visits to the report addresses', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.none);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.model.sheets[0].addresses[0].visits.length).toBe(0);
      expect(ctrl.model.sheets[0].addresses[1].visits.length).toBe(0);
      expect(ctrl.model.sheets[1].addresses[0].visits.length).toBe(0);
      expect(ctrl.model.sheets[2].addresses[0].visits.length).toBe(0);
      expect(ctrl.model.sheets[2].addresses[1].visits.length).toBe(0);

    });

    it('should determine the visit state of the address (no adresses)', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.none);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[0])).toBeTruthy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[1].addresses[0])).toBeTruthy();

      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[1])).toBeFalsy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[1].addresses[0])).toBeFalsy();

    });

    it('should determine the visit state of the address (iteration 1, success and fail visit)', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.iterationOne);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[1])).toBeFalsy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[1].addresses[0])).toBeTruthy();

      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[0])).toBeTruthy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[1])).toBeFalsy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[1].addresses[0])).toBeFalsy();

    });

  });

  describe('The loading of the second iteration (2)', function () {

    beforeEach(function () {
      httpBackend.whenGET('/reports/100?projection=entities').respond(200, reportsMock.iterationTwo);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should load the report entity', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.iterationOne);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.model.report).toBeDefined();
      expect(ctrl.model.report.id).toBe(100);
      expect(ctrl.model.report.area.id).toBe(39);
      expect(ctrl.model.report.iteration).toBe(2);

    });

    it('should correctly display the result of previous iteration (1)', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.iterationOne);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[1].addresses[0])).toBeTruthy();

      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[0])).toBeTruthy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[1])).toBeFalsy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[1].addresses[0])).toBeFalsy();

    });

    it('should correctly display the result of current iteration (2)', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.iterationTwo);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[1])).toBeFalsy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[1].addresses[0])).toBeTruthy();

      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[0])).toBeTruthy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[1])).toBeFalsy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[1].addresses[0])).toBeFalsy();

    });

  });

  describe('The loading of the third iteration (3)', function () {

    beforeEach(function () {
      httpBackend.whenGET('/reports/100?projection=entities').respond(200, reportsMock.iterationThree);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should load the report entity', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.iterationTwo);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.model.report).toBeDefined();
      expect(ctrl.model.report.id).toBe(100);
      expect(ctrl.model.report.area.id).toBe(39);
      expect(ctrl.model.report.iteration).toBe(3);

    });

    it('should correctly display the result of previous iteration (2)', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.iterationTwo);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[1].addresses[0])).toBeTruthy();

      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[0])).toBeTruthy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[1])).toBeFalsy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[1].addresses[0])).toBeFalsy();

    });

    it('should correctly display the result of current iteration (3)', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.iterationThree);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[1])).toBeFalsy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[1].addresses[0])).toBeTruthy();

      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[0])).toBeTruthy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[1])).toBeFalsy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[1].addresses[0])).toBeFalsy();

    });

  });

  describe('The loading of the fourth iteration (4)', function () {

    beforeEach(function () {
      httpBackend.whenGET('/reports/100?projection=entities').respond(200, reportsMock.iterationFour);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should load the report entity', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.iterationThree);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.model.report).toBeDefined();
      expect(ctrl.model.report.id).toBe(100);
      expect(ctrl.model.report.area.id).toBe(39);
      expect(ctrl.model.report.iteration).toBe(4);

    });

    it('should correctly display the result of previous iteration (2)', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.iterationThree);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[1].addresses[0])).toBeTruthy();

      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[0])).toBeTruthy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[1])).toBeFalsy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[1].addresses[0])).toBeFalsy();

    });

    it('should correctly display the result of current iteration (3)', function () {
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.iterationFour);

      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[0])).toBeFalsy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[0].addresses[1])).toBeFalsy();
      expect(ctrl.isVisitEnabled(ctrl.model.sheets[1].addresses[0])).toBeTruthy();

      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[0])).toBeTruthy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[0].addresses[1])).toBeTruthy();
      expect(ctrl.isVisitSuccess(ctrl.model.sheets[1].addresses[0])).toBeFalsy();

    });

  });



});
