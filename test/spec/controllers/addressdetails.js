'use strict';

describe('Controller: AddressdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('fieldserviceFeApp'));

  var AddressdetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddressdetailsCtrl = $controller('AddressdetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddressdetailsCtrl.awesomeThings.length).toBe(3);
  });
});
