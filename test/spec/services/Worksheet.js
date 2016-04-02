'use strict';

fdescribe('Service: Worksheet', function () {

  // load the service's module
  beforeEach(module('fieldserviceFeApp'));

  // instantiate service
  var worksheet;

  beforeEach(inject(function (Worksheet) {
    worksheet = new Worksheet(workSheetsMock.visits);
  }));

  it('should properly display a list of datebuckets', function () {
    var visitDates = [
      '2016-02-29T09:01:42.273',  //ochtend
      '2016-02-29T12:59:42.273',  //middag
      '2016-02-29T18:59:42.273'   //avond
    ];

    var dateBuckets = worksheet.getDateTimeBuckets(visitDates);

    expect(dateBuckets[0].day).toBe('Monday');
    expect(dateBuckets[1].day).toBe('Monday');
    expect(dateBuckets[2].day).toBe('Monday');

    expect(dateBuckets[0].partOfDay).toBe(1);
    expect(dateBuckets[1].partOfDay).toBe(2);
    expect(dateBuckets[2].partOfDay).toBe(3);

  });

  it('should properly sort a list of datebuckets', function () {
    var visitDates = [
      '2016-02-29T18:59:42.273',   //avond
      '2016-02-29T12:59:42.273',  //middag
      '2016-02-29T09:01:42.273'  //ochtend
    ];

    var dateBuckets = worksheet.getDateTimeBuckets(visitDates);

    expect(dateBuckets[0].day).toBe('Monday');
    expect(dateBuckets[1].day).toBe('Monday');
    expect(dateBuckets[2].day).toBe('Monday');

    expect(dateBuckets[0].partOfDay).toBe(1);
    expect(dateBuckets[1].partOfDay).toBe(2);
    expect(dateBuckets[2].partOfDay).toBe(3);

  });

  it('should properly normalize a list of datebuckets', function () {
    var visitDates = [
      '2016-02-29T12:59:42.273',  //middag
      '2016-02-29T18:59:42.273',   //avond
      '2016-02-29T19:59:42.273',   //avond
      '2016-02-29T13:59:42.273',  //middag
      '2016-02-29T09:01:42.273'  //ochtend
    ];

    var dateBuckets = worksheet.getDateTimeBuckets(visitDates);

    expect(dateBuckets[0].day).toBe('Monday');
    expect(dateBuckets[1].day).toBe('Monday');
    expect(dateBuckets[2].day).toBe('Monday');

    expect(dateBuckets[0].partOfDay).toBe(1);
    expect(dateBuckets[1].partOfDay).toBe(2);
    expect(dateBuckets[2].partOfDay).toBe(3);

    expect(dateBuckets.length).toBe(3);

  });

});
