'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Authorisation', function ($resource, config) {

  return $resource(config.api.hostname + '/authorisation/:mode', {}, {
    login: {
      method:'GET',
      params: {
        mode: 'login'
      }
    }
  });

});
