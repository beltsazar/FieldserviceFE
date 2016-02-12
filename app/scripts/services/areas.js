'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Areas', function ($resource, config) {

  return $resource(config.api.hostname + '/areas/:id/:entity', {}, {
    add: {
      method:'POST'
    },
    update: {
      method:'PUT'
    }
  });

});
