'use strict';

describe('Controller: CitylistCtrl', function () {

  // load the controller's module
  beforeEach(module('fieldserviceFeApp'));

  var CitylistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CitylistCtrl = $controller('CitylistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CitylistCtrl.awesomeThings.length).toBe(3);
  });
});
