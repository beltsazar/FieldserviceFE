'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('ViewAreas', function ($resource, config) {

  return $resource(config.api.hostname + '/areas/view', {}, {
    query: {
      method: 'GET',
      isArray: true
    }
  });

});
