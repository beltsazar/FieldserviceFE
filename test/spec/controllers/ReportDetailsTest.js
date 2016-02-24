'use strict';

describe('Controller: ReportDetails', function () {

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

  fdescribe('The loading of the first iteration', function () {

    beforeEach(function () {
      httpBackend.whenGET('/reports/100?projection=entities').respond(200, reportsMock.iterationOne);
      httpBackend.whenGET(/\/visits\/search\/findByReport.*/).respond(200, visitsMock.none);
    });

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should load the report entity', function () {
      var ctrl = createController();
      httpBackend.flush();

      expect(ctrl.model.report).toBeDefined();
      expect(ctrl.model.report.id).toBe(100);
      expect(ctrl.model.report.area.id).toBe(39);

    });

    it('should load the report sheets', function () {
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

  });






});
