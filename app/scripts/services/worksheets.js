'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Worksheets', function ($resource, config) {

  return $resource(config.api.hostname + '/worksheets/:search/:findBy/:id/:entity', {}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: function(response) {
        return angular.fromJson(response)._embedded.worksheets;
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
    }
  });

});
