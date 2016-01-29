'use strict';

describe('Filter: path', function () {

  // load the filter's module
  beforeEach(module('fieldserviceFeApp'));

  // initialize a new instance of the filter before each test
  var path;
  beforeEach(inject(function ($filter) {
    path = $filter('path');
  }));

  it('should return the input prefixed with "path filter:"', function () {
    var text = 'angularjs';
    expect(path(text)).toBe('path filter: ' + text);
  });

});
