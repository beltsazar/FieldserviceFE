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
    add: {
      method:'POST'
    },
    update: {
      method:'PUT'
    }
  });

});
