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

visitsMock.iterationOne = {
  "_embedded" : {
    "visits" : [ {
      "address" : {
        "id" : 37,
        "number" : 1
      },
      "id" : 158,
      "success" : true,
      "creationDate" : "24-02-2016 04:06:21",
      "iteration" : 1,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/153"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/153{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/153/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/153/address"
        }
      }
    }, {
      "address" : {
        "id" : 43,
        "number" : 5
      },
      "id" : 159,
      "success" : false,
      "creationDate" : "24-02-2016 04:06:58",
      "iteration" : 1,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/154"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/154{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/154/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/154/address"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/visits/search/findByReport?projection=entities&report=reports%2F100&sort=addressId&sort=iteration"
    }
  },
  "page" : {
    "size" : 20,
    "totalElements" : 2,
    "totalPages" : 1,
    "number" : 0
  }
}

visitsMock.iterationTwo = {
  "_embedded" : {
    "visits" : [ {
      "address" : {
        "id" : 37,
        "number" : 1
      },
      "id" : 158,
      "creationDate" : "24-02-2016 05:05:43",
      "iteration" : 1,
      "success" : true,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/158"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/158{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/158/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/158/address"
        }
      }
    }, {
      "address" : {
        "id" : 43,
        "number" : 5
      },
      "id" : 159,
      "creationDate" : "24-02-2016 05:05:44",
      "iteration" : 1,
      "success" : false,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/159"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/159{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/159/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/159/address"
        }
      }
    }, {
      "address" : {
        "id" : 43,
        "number" : 5
      },
      "id" : 160,
      "creationDate" : "24-02-2016 08:58:37",
      "iteration" : 2,
      "success" : false,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/160"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/160{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/160/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/160/address"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/visits/search/findByReport?projection=entities&report=reports%2F100&sort=address.id&sort=iteration"
    }
  },
  "page" : {
    "size" : 20,
    "totalElements" : 3,
    "totalPages" : 1,
    "number" : 0
  }
}

visitsMock.iterationThree = {
  "_embedded" : {
    "visits" : [ {
      "address" : {
        "id" : 37,
        "number" : 1
      },
      "id" : 158,
      "creationDate" : "24-02-2016 05:05:43",
      "iteration" : 1,
      "success" : true,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/158"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/158{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/158/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/158/address"
        }
      }
    }, {
      "address" : {
        "id" : 43,
        "number" : 5
      },
      "id" : 159,
      "creationDate" : "24-02-2016 05:05:44",
      "iteration" : 1,
      "success" : false,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/159"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/159{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/159/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/159/address"
        }
      }
    }, {
      "address" : {
        "id" : 43,
        "number" : 5
      },
      "id" : 160,
      "creationDate" : "24-02-2016 08:58:37",
      "iteration" : 2,
      "success" : false,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/160"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/160{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/160/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/160/address"
        }
      }
    }, {
      "address" : {
        "id" : 43,
        "number" : 5
      },
      "id" : 161,
      "creationDate" : "24-02-2016 09:12:12",
      "iteration" : 3,
      "success" : false,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/161"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/161{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/161/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/161/address"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/visits/search/findByReport?projection=entities&report=reports%2F100&sort=address.id&sort=iteration"
    }
  },
  "page" : {
    "size" : 20,
    "totalElements" : 4,
    "totalPages" : 1,
    "number" : 0
  }
}

visitsMock.iterationFour = {
  "_embedded" : {
    "visits" : [ {
      "address" : {
        "id" : 37,
        "number" : 1
      },
      "id" : 158,
      "creationDate" : "24-02-2016 05:05:43",
      "iteration" : 1,
      "success" : true,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/158"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/158{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/158/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/158/address"
        }
      }
    }, {
      "address" : {
        "id" : 43,
        "number" : 5
      },
      "id" : 159,
      "creationDate" : "24-02-2016 05:05:44",
      "iteration" : 1,
      "success" : false,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/159"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/159{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/159/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/159/address"
        }
      }
    }, {
      "address" : {
        "id" : 43,
        "number" : 5
      },
      "id" : 160,
      "creationDate" : "24-02-2016 08:58:37",
      "iteration" : 2,
      "success" : false,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/160"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/160{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/160/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/160/address"
        }
      }
    }, {
      "address" : {
        "id" : 43,
        "number" : 5
      },
      "id" : 161,
      "creationDate" : "24-02-2016 09:12:12",
      "iteration" : 3,
      "success" : false,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/161"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/161{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/161/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/161/address"
        }
      }
    }, {
      "address" : {
        "id" : 43,
        "number" : 5
      },
      "id" : 162,
      "creationDate" : "24-02-2016 09:19:42",
      "iteration" : 4,
      "success" : true,
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/visits/162"
        },
        "visit" : {
          "href" : "http://localhost:8080/visits/162{?projection}",
          "templated" : true
        },
        "report" : {
          "href" : "http://localhost:8080/visits/162/report"
        },
        "address" : {
          "href" : "http://localhost:8080/visits/162/address"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/visits/search/findByReport?projection=entities&report=reports%2F100&sort=address.id&sort=iteration"
    }
  },
  "page" : {
    "size" : 20,
    "totalElements" : 5,
    "totalPages" : 1,
    "number" : 0
  }
}
