'use strict';

var addressesMock = {};

addressesMock.list = {
  "_embedded" : {
    "addresses" : [ {
      "number" : 1,
      "street" : {
        "name" : "Bereklauw"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/50"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/50{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/50/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/50/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/50/street"
        }
      }
    }, {
      "number" : 3,
      "street" : {
        "name" : "Bereklauw"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/51"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/51{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/51/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/51/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/51/street"
        }
      }
    }, {
      "number" : 5,
      "street" : {
        "name" : "Bereklauw"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/52"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/52{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/52/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/52/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/52/street"
        }
      }
    }, {
      "number" : 1,
      "street" : {
        "name" : "Houtrib"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/41"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/41{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/41/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/41/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/41/street"
        }
      }
    }, {
      "number" : 124,
      "street" : {
        "name" : "Houtrib"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/28"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/28{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/28/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/28/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/28/street"
        }
      }
    }, {
      "number" : 456,
      "street" : {
        "name" : "Houtrib"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/27"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/27{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/27/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/27/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/27/street"
        }
      }
    }, {
      "number" : 1,
      "street" : {
        "name" : "Zwaluwtong"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/44"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/44{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/44/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/44/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/44/street"
        }
      }
    }, {
      "number" : 3,
      "street" : {
        "name" : "Zwaluwtong"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/45"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/45{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/45/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/45/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/45/street"
        }
      }
    }, {
      "number" : 5,
      "street" : {
        "name" : "Zwaluwtong"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/46"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/46{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/46/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/46/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/46/street"
        }
      }
    }, {
      "number" : 7,
      "street" : {
        "name" : "Zwaluwtong"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/47"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/47{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/47/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/47/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/47/street"
        }
      }
    }, {
      "number" : 9,
      "street" : {
        "name" : "Zwaluwtong"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/48"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/48{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/48/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/48/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/48/street"
        }
      }
    }, {
      "number" : 124,
      "street" : {
        "name" : "Zwaluwtong"
      },
      "area" : {
        "number" : 1
      },
      "city" : {
        "name" : "Monnickendam"
      },
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/addresses/29"
        },
        "address" : {
          "href" : "http://localhost:8080/addresses/29{?projection}",
          "templated" : true
        },
        "city" : {
          "href" : "http://localhost:8080/addresses/29/city"
        },
        "area" : {
          "href" : "http://localhost:8080/addresses/29/area"
        },
        "street" : {
          "href" : "http://localhost:8080/addresses/29/street"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/addresses/search/findByArea?area=areas/38&projection=entities&sort=city.name&sort=street.name&sort=number"
    }
  },
  "page" : {
    "size" : 20,
    "totalElements" : 12,
    "totalPages" : 1,
    "number" : 0
  }
}
