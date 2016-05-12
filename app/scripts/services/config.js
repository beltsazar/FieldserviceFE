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

    this.maps = {
      center: {
        lat: 52.46584119838708,
        lng: 5.024528503417969,
        zoom: 12
      },
      defaultStyle: {
        stroke: true,
        weight: 8,
        color: 'blue',
        fillOpacity: 0.1,
        opacity: 0.5
      },
      editStyle: {
        weight: 3,
        color: 'red',
        fillOpacity: 0.1,
        opacity: 0.5
      }
    };


  });
