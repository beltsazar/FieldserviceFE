'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Addresses', function ($resource) {

  return $resource('http://localhost:8080/addresses/:id/:entity', {}, {
    add: {
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
