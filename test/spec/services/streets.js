'use strict';

describe('Service: streets', function () {

  // load the service's module
  beforeEach(module('fieldserviceFeApp'));

  // instantiate service
  var streets;
  beforeEach(inject(function (_streets_) {
    streets = _streets_;
  }));

  it('should do something', function () {
    expect(!!streets).toBe(true);
  });

});
