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
    this.environment = 'DEVELOP'; // DEVELOP|LIVE (Set from app js)

    this.api = {
      hostname: '/api'
    };

    if (angular.equals(this.environment, 'DEVELOP')) {
      this.api.hostname = 'https://' + $location.host() + ':8080' + '/api';
    }
    else {
      L.Icon.Default.imagePath = '/styles/images/';
    }

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
          color: 'darkorange',
          opacity: 1,
          fillOpacity: 0.1
        },
        success: {
          stroke: true,
          weight: 5,
          color: 'blue',
          opacity: 0.5,
          fillOpacity: 0.1
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
          color: 'darkgreen',
          opacity: 0.4,
          fillOpacity: 0.1
        },
        city: {
          stroke: true,
          weight: 1,
          color: 'blue',
          opacity: 0.5,
          fillOpacity: 0

        }
      }
    };
  });
