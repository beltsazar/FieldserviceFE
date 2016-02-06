'use strict';

describe('Controller: StreetlistCtrl', function () {

  // load the controller's module
  beforeEach(module('fieldserviceFeApp'));

  var StreetlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StreetlistCtrl = $controller('StreetlistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StreetlistCtrl.awesomeThings.length).toBe(3);
  });
});
