'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Visits', function ($resource, config) {

  return $resource(config.api.hostname + '/visits/:id/:entity/:search/:findBy/:query', {}, {
    add: {
      method:'POST'
    },
    update: {
      method:'PUT'
    },
    findByReport: {
      params: {
        search: 'search',
        findBy: 'findByReport'
      }
    }
  });

});
