'use strict';

describe('Controller: AreadetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('fieldserviceFeApp'));

  var AreadetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AreadetailsCtrl = $controller('AreadetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AreadetailsCtrl.awesomeThings.length).toBe(3);
  });
});
