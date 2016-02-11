'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Addresses', function ($resource) {

  return $resource('http://192.168.1.112:8080/addresses/:search/:findBy/:id/:entity', {}, {
    add: {
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
      params: {
        search: 'search',
        findBy: 'findByArea'
      }
    }
  });

});
