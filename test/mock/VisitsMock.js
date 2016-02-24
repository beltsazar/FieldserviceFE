'use strict';

var visitsMock = {};

visitsMock.none = {
  "_embedded" : {
    "addresses" : [ ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/visits/search/findByReport?projection=entities&report=reports%2F100&sort=addressId&sort=iteration"
    }
  },
  "page" : {
    "size" : 20,
    "totalElements" : 0,
    "totalPages" : 0,
    "number" : 0
  }
}
