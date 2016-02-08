'use strict';

describe('Controller: ArealistCtrl', function () {

  // load the controller's module
  beforeEach(module('fieldserviceFeApp'));

  var ArealistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArealistCtrl = $controller('ArealistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArealistCtrl.awesomeThings.length).toBe(3);
  });
});
