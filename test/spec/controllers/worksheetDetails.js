'use strict';

fdescribe('Controller: WorksheetDetails', function () {

  var scope, httpBackend, createController;

  beforeEach(module('fieldserviceFeApp'));

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, config) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    config.api.hostname = '';

    var routeParamsMock = {
      id: 1
    };

    httpBackend.whenGET('/areas/1').respond(200, areasMock.detail);
    httpBackend.whenGET(/\/addresses\/.*/).respond(200, addressesMock.list);

    createController = function() {
      return $controller('WorksheetDetails', {
        $scope: scope,
        $routeParams: routeParamsMock
      });
    };

  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should get the area entity and address entities', function () {
    httpBackend.expectGET('/areas/1');
    httpBackend.expectGET(/\/addresses\/.*/);

    var ctrl = createController();
    httpBackend.flush();

    expect(ctrl.entities.addresses.length).toBe(12);
    expect(ctrl.model.area.number).toBe(1);
  });

  it('should get the area entity and address entities', function () {
    httpBackend.expectGET('/areas/1');
    httpBackend.expectGET(/\/addresses\/.*/);

    var ctrl = createController();
    httpBackend.flush();

    expect(ctrl.entities.addresses).toBeDefined();
  });


});
