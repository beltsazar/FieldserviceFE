'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Cities', function ($resource, config) {

  return $resource(config.api.hostname + '/cities/:id', {}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: function(response) {
        return angular.fromJson(response)._embedded.cities;
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
