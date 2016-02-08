'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Areas', function ($resource) {

  return $resource('http://localhost:8080/areas/:id/:entity', {}, {
    add: {
      method:'POST'
    },
    update: {
      method:'PUT'
    }
  });

});
