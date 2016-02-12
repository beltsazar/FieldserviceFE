'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Streets', function ($resource, config) {

  return $resource(config.api.hostname + '/streets/:id', {}, {
    add: {
      method:'POST'
    },
    update: {
      method:'PUT'
    }
  });

});
