'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.config
 * @description
 * # config
 * Service in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp')
  .service('config', function ($location) {

    this.api = {
      hostname: $location.protocol() + '://' + $location.host() + ':8080',
    };

  });
