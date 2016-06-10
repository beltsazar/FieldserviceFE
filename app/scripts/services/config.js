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
      hostname: $location.protocol() + '://' + $location.host() + ':8080' + '/api'
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
          fillOpacity: 0.1,
          opacity: 0.4
        },
        warning: {
          stroke: true,
          weight: 5,
          color: 'orange',
          opacity: 0.7,
          fillOpacity: 0.2
        },
        success: {
          stroke: true,
          weight: 5,
          color: 'darkgreen',
          fillOpacity: 0.2
        },
        danger: {
          stroke: true,
          weight: 5,
          color: 'red',
          fillOpacity: 0.1
        },
        waiting: {
          stroke: true,
          weight: 5,
          color: 'gray',
          opacity: 0.5,
          fillOpacity: 0.2
        }
      }
    };
  });
