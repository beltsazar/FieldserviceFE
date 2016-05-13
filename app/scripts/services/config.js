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
      hostname: $location.protocol() + '://' + $location.host() + ':8080' + '/api',
    };

    this.map = {
      center: {
        lat: 52.46584119838708,
        lng: 5.024528503417969,
        zoom: 12
      },
      styles: {
        default: {
          stroke: true,
          weight: 5,
          color: 'blue',
          fillOpacity: 0.1
        }
      }
    };
  });
