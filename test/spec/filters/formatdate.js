'use strict';

describe('Filter: formatDate', function () {

  // load the filter's module
  beforeEach(module('fieldserviceFeApp'));

  // initialize a new instance of the filter before each test
  var formatDate;
  beforeEach(inject(function ($filter) {
    formatDate = $filter('formatDate');
  }));

  it('should return the input prefixed with "formatDate filter:"', function () {
    var text = 'angularjs';
    expect(formatDate(text)).toBe('formatDate filter: ' + text);
  });

});
