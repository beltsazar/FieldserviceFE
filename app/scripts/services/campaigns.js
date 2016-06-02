'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Campaigns', function ($resource, config) {

  return $resource(config.api.hostname + '/campaigns/:id', {}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: function(response) {
        return angular.fromJson(response)._embedded.campaigns;
      }
    },
    create: {
      method:'POST'
    },
    update: {
      method:'PUT'
    },
    findByActive: {
      isArray: true,
      transformResponse: function(response) {
        return angular.fromJson(response)._embedded.assignments;
      },
      params: {
        search: 'search',
        findBy: 'findByActive'
      }
    }
  });

});
