'use strict';

var reportsMock = {};

reportsMock.iterationOne = {
  "id" : 100,
  "active" : true,
  "iteration" : 1,
  "creationDate" : "21-02-2016 04:39:04",
  "area" : {
    "id" : 39,
    "number" : 1
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/reports/100"
    },
    "report" : {
      "href" : "http://localhost:8080/reports/100{?projection}",
      "templated" : true
    },
    "area" : {
      "href" : "http://localhost:8080/reports/100/area"
    },
    "visits" : {
      "href" : "http://localhost:8080/reports/100/visits"
    }
  }
}

