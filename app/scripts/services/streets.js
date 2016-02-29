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
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: function(response) {
        return angular.fromJson(response)._embedded.streets;
      }
    },
    create: {
      method:'POST'
    },
    update: {
      method:'PUT'
    }
  });

});
