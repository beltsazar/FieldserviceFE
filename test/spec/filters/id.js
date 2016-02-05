'use strict';

describe('Filter: id', function () {

  // load the filter's module
  beforeEach(module('fieldserviceFeApp'));

  // initialize a new instance of the filter before each test
  var id;
  beforeEach(inject(function ($filter) {
    id = $filter('id');
  }));

  it('should return the input prefixed with "id filter:"', function () {
    var text = 'angularjs';
    expect(id(text)).toBe('id filter: ' + text);
  });

});
