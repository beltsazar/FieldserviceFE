var workSheetsMock = {}

workSheetsMock.iteration1 = {
  "id": 100, "active": false, "iteration": 1, "area": {
    "id": 39, "number": 1, "city": {
      "id": 17, "name": "Monnickendam"
    }
  }
  ,
  "groups": [{
    "street": {"id": 49, "name": "Bereklauw"},
    "addresses": [
      {"id": 50, "number": 1},
      {
        "id": 51, "number": 3,
        "visits": [
          {"id": 266, "success": false, "iteration": 1, "creationDate": "2016-03-06T17:12:38.565"}]
      },
      {
        "id": 52, "number": 5,
        "visits": [
          {"id": 266, "success": true, "iteration": 1, "creationDate": "2016-03-06T17:12:38.565"}]
      }]
  }, {
    "street": {"id": 32, "name": "Houtrib"},
    "addresses": [{
      "id": 41,
      "number": 111,
      "visits": [{"id": 267, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:40.707"}]
    }, {"id": 33, "number": 777}, {"id": 27, "number": 4567}, {"id": 35, "number": 12345}, {"id": 28, "number": 12450}]
  }, {
    "street": {"id": 31, "name": "Zwaluwtong"},
    "addresses": [{"id": 44, "number": 1}, {
      "id": 45,
      "number": 3,
      "visits": [{"id": 268, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:41.457"}]
    }, {"id": 46, "number": 5}, {"id": 47, "number": 7}, {"id": 48, "number": 9}, {"id": 54, "number": 11}, {
      "id": 29,
      "number": 124,
      "visits": [{"id": 269, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:42.273"}]
    }, {"id": 244, "number": 88888888}]
  }]
}

workSheetsMock.iteration2 = {
  "id": 100, "active": false, "iteration": 1, "area": {
    "id": 39, "number": 1, "city": {
      "id": 17, "name": "Monnickendam"
    }
  }
  ,
  "groups": [{
    "street": {"id": 49, "name": "Bereklauw"},
    "addresses": [
      {"id": 50, "number": 1},
      {
        "id": 51, "number": 3,
        "visits": [
          {"id": 266, "success": false, "iteration": 1, "creationDate": "2016-03-06T17:12:38.565"},
          {"id": 266, "success": false, "iteration": 2, "creationDate": "2016-03-06T17:12:38.565"}]
      },
      {
        "id": 52, "number": 5,
        "visits": [
          {"id": 266, "success": true, "iteration": 1, "creationDate": "2016-03-06T17:12:38.565"}]
      }]
  }, {
    "street": {"id": 32, "name": "Houtrib"},
    "addresses": [{
      "id": 41,
      "number": 111,
      "visits": [{"id": 267, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:40.707"}]
    }, {"id": 33, "number": 777}, {"id": 27, "number": 4567}, {"id": 35, "number": 12345}, {"id": 28, "number": 12450}]
  }, {
    "street": {"id": 31, "name": "Zwaluwtong"},
    "addresses": [{"id": 44, "number": 1}, {
      "id": 45,
      "number": 3,
      "visits": [{"id": 268, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:41.457"}]
    }, {"id": 46, "number": 5}, {"id": 47, "number": 7}, {"id": 48, "number": 9}, {"id": 54, "number": 11}, {
      "id": 29,
      "number": 124,
      "visits": [{"id": 269, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:42.273"}]
    }, {"id": 244, "number": 88888888}]
  }]
}

workSheetsMock.iteration3 = {
  "id": 100, "active": false, "iteration": 1, "area": {
    "id": 39, "number": 1, "city": {
      "id": 17, "name": "Monnickendam"
    }
  }
  ,
  "groups": [{
    "street": {"id": 49, "name": "Bereklauw"},
    "addresses": [
      {"id": 50, "number": 1},
      {
        "id": 51, "number": 3,
        "visits": [
          {"id": 266, "success": false, "iteration": 1, "creationDate": "2016-03-06T17:12:38.565"},
          {"id": 266, "success": false, "iteration": 2, "creationDate": "2016-03-06T17:12:38.565"},
          {"id": 266, "success": true, "iteration": 3, "creationDate": "2016-03-06T17:12:38.565"}]
      },
      {
        "id": 52, "number": 5,
        "visits": [
          {"id": 266, "success": true, "iteration": 1, "creationDate": "2016-03-06T17:12:38.565"}]
      }]
  }, {
    "street": {"id": 32, "name": "Houtrib"},
    "addresses": [{
      "id": 41,
      "number": 111,
      "visits": [{"id": 267, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:40.707"}]
    }, {"id": 33, "number": 777}, {"id": 27, "number": 4567}, {"id": 35, "number": 12345}, {"id": 28, "number": 12450}]
  }, {
    "street": {"id": 31, "name": "Zwaluwtong"},
    "addresses": [{"id": 44, "number": 1}, {
      "id": 45,
      "number": 3,
      "visits": [{"id": 268, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:41.457"}]
    }, {"id": 46, "number": 5}, {"id": 47, "number": 7}, {"id": 48, "number": 9}, {"id": 54, "number": 11}, {
      "id": 29,
      "number": 124,
      "visits": [{"id": 269, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:42.273"}]
    }, {"id": 244, "number": 88888888}]
  }]
}

workSheetsMock.iteration3 = {
  "id": 100, "active": false, "iteration": 3, "area": {
    "id": 39, "number": 1, "city": {
      "id": 17, "name": "Monnickendam"
    }
  }
  ,
  "groups": [{
    "street": {"id": 49, "name": "Bereklauw"},
    "addresses": [
      {"id": 50, "number": 1},
      {
        "id": 51, "number": 3,
        "visits": [
          {"id": 266, "success": false, "iteration": 1, "creationDate": "2016-03-06T17:12:38.565"},
          {"id": 266, "success": false, "iteration": 2, "creationDate": "2016-03-06T17:12:38.565"},
          {"id": 266, "success": true, "iteration": 3, "creationDate": "2016-03-06T17:12:38.565"}]
      },
      {
        "id": 52, "number": 5,
        "visits": [
          {"id": 266, "success": true, "iteration": 1, "creationDate": "2016-03-06T17:12:38.565"}]
      }]
  }, {
    "street": {"id": 32, "name": "Houtrib"},
    "addresses": [{
      "id": 41,
      "number": 111,
      "visits": [{"id": 267, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:40.707"}]
    }, {"id": 33, "number": 777}, {"id": 27, "number": 4567}, {"id": 35, "number": 12345}, {"id": 28, "number": 12450}]
  }, {
    "street": {"id": 31, "name": "Zwaluwtong"},
    "addresses": [{"id": 44, "number": 1}, {
      "id": 45,
      "number": 3,
      "visits": [{"id": 268, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:41.457"}]
    }, {"id": 46, "number": 5}, {"id": 47, "number": 7}, {"id": 48, "number": 9}, {"id": 54, "number": 11}, {
      "id": 29,
      "number": 124,
      "visits": [
        {"id": 269, "success": false, "iteration": 0, "creationDate": "2016-03-06T17:12:42.273"}

      ]
    }, {"id": 244, "number": 88888888}]
  }]
}

workSheetsMock.visits = {
  "id": 100, "active": false, "iteration": 3, "area": {
    "id": 39, "number": 1, "city": {
      "id": 17, "name": "Monnickendam"
    }
  }
  ,
  "groups": [{
    "street": {"id": 49, "name": "Bereklauw"},
    "addresses": [
      {"id": 50, "number": 1},
      {
        "id": 51, "number": 3,
        "visits": [
          {"id": 266, "success": false, "iteration": 1, "creationDate": "2016-03-06T17:12:38.565"},
          {"id": 266, "success": false, "iteration": 2, "creationDate": "2016-03-06T17:12:38.565"},
          {"id": 266, "success": true, "iteration": 3, "creationDate": "2016-03-06T17:12:38.565"}]
      },
      {
        "id": 52, "number": 5,
        "visits": [
          {"id": 266, "success": true, "iteration": 3, "creationDate": "2016-03-06T17:12:38.565"}]
      }]
  }, {
    "street": {"id": 32, "name": "Houtrib"},
    "addresses": [{
      "id": 41,
      "number": 111,
      "visits": [{"id": 267, "success": false, "iteration": 3, "creationDate": "2016-03-06T17:12:40.707"}]
    }, {"id": 33, "number": 777}, {"id": 27, "number": 4567}, {"id": 35, "number": 12345}, {"id": 28, "number": 12450}]
  }, {
    "street": {"id": 31, "name": "Zwaluwtong"},
    "addresses": [{"id": 44, "number": 1}, {
      "id": 45,
      "number": 3,
      "visits": [{"id": 268, "success": false, "iteration": 3, "creationDate": "2016-03-06T17:12:41.457"}]
    }, {"id": 46, "number": 5}, {"id": 47, "number": 7}, {"id": 48, "number": 9}, {"id": 54, "number": 11}, {
      "id": 29,
      "number": 124,
      "visits": [
        {"id": 269, "success": false, "iteration": 3, "creationDate": "2016-03-06T17:12:42.273"},
        {"id": 269, "success": false, "iteration": 3, "creationDate": "2016-04-06T17:12:42.273"}

      ]
    }, {"id": 244, "number": 88888888}]
  }]
}
