'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('AddressAnnotations', function ($resource, config) {

  return $resource(config.api.hostname + '/addressAnnotations/:id', {}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: function(response) {
        return [angular.fromJson(response)._embedded.addressAnnotations, angular.fromJson(response).page];
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
