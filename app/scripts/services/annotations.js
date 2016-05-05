'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Annotations', function ($resource, config) {

  return $resource(config.api.hostname + '/annotations/:id', {}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: function(response) {
        return angular.fromJson(response)._embedded.accounts;
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
