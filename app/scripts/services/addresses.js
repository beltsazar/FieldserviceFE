'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Addresses', function ($resource, config) {

  return $resource(config.api.hostname + '/addresses/:search/:findBy/:id/:entity', {}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: function(response) {
        return [angular.fromJson(response)._embedded.addresses, angular.fromJson(response).page];
      }
    },
    create: {
      method:'POST'
    },
    update: {
      method:'PUT'
    },
    updateEntity: {
      method:'PUT',
      headers: { 'Content-Type': 'text/uri-list' }
    },
    findByArea: {
      isArray: true,
      transformResponse: function(response) {
        return angular.fromJson(response)._embedded.addresses;
      },
      params: {
        search: 'search',
        findBy: 'findByArea'
      }
    }
  });

});
