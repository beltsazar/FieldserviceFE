'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Reports', function ($resource, config) {

  return $resource(config.api.hostname + '/reports/:search/:findBy/:id/:entity', {}, {
    add: {
      method:'POST'
    },
    update: {
      method:'PUT'
    },
    findByArea: {
      params: {
        search: 'search',
        findBy: 'findByArea'
      }
    }
  });

});
