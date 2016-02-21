'use strict';

describe('Service: visits', function () {

  // load the service's module
  beforeEach(module('fieldserviceFeApp'));

  // instantiate service
  var visits;
  beforeEach(inject(function (_visits_) {
    visits = _visits_;
  }));

  it('should do something', function () {
    expect(!!visits).toBe(true);
  });

});
