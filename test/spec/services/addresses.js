'use strict';

describe('Service: addresses', function () {

  // load the service's module
  beforeEach(module('fieldserviceFeApp'));

  // instantiate service
  var addresses;
  beforeEach(inject(function (_addresses_) {
    addresses = _addresses_;
  }));

  it('should do something', function () {
    expect(!!addresses).toBe(true);
  });

});
