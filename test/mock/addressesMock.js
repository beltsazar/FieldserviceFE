'use strict';

var addressesMock = {};

addressesMock.list = {
  "_embedded" : {
    "addresses" : [ {
      "id" : 37,
      "number" : 1,
      "area" : {
        "id" : 39,
        "number" : 2
      },
      "street" : {
        "id" : 49,
        "name" : "Bereklauw"
      },
      "city" : {
        "id" : 17,
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/37"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/37{?projection}",
          "templated" : true
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/37/street"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/37/area"
        },
        "visits" : {
          "href" : "http://localhost:8080/addresses/37/visits"
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/37/city"
        }
      }
    }, {
      "id" : 43,
      "number" : 5,
      "area" : {
        "id" : 39,
        "number" : 2
      },
      "street" : {
        "id" : 49,
        "name" : "Bereklauw"
      },
      "city" : {
        "id" : 17,
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/43"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/43{?projection}",
          "templated" : true
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/43/street"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/43/area"
        },
        "visits" : {
          "href" : "http://localhost:8080/addresses/43/visits"
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/43/city"
        }
      }
    }, {
      "id" : 24,
      "number" : 3,
      "area" : {
        "id" : 39,
        "number" : 2
      },
      "street" : {
        "id" : 32,
        "name" : "Houtrib"
      },
      "city" : {
        "id" : 17,
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/24"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/24{?projection}",
          "templated" : true
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/24/street"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/24/area"
        },
        "visits" : {
          "href" : "http://localhost:8080/addresses/24/visits"
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/24/city"
        }
      }
    }, {
      "id" : 30,
      "number" : 35,
      "area" : {
        "id" : 39,
        "number" : 2
      },
      "street" : {
        "id" : 31,
        "name" : "Zwaluwtong"
      },
      "city" : {
        "id" : 17,
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/30"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/30{?projection}",
          "templated" : true
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/30/street"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/30/area"
        },
        "visits" : {
          "href" : "http://localhost:8080/addresses/30/visits"
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/30/city"
        }
      }
    }, {
      "id" : 36,
      "number" : 124,
      "area" : {
        "id" : 39,
        "number" : 2
      },
      "street" : {
        "id" : 31,
        "name" : "Zwaluwtong"
      },
      "city" : {
        "id" : 17,
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/36"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/36{?projection}",
          "templated" : true
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/36/street"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/36/area"
        },
        "visits" : {
          "href" : "http://localhost:8080/addresses/36/visits"
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/36/city"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/addresses/search/findByArea?area=areas%2F39&projection=entities&sort=street.name&sort=number"
    }
  },
  "page" : {
    "size" : 20,
    "totalElements" : 5,
    "totalPages" : 1,
    "number" : 0
  }
}
