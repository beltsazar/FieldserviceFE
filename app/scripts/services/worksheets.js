'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Worksheets', function ($resource, config) {

  return $resource(config.api.hostname + '/worksheets/:search/:findBy/:id/:entity/:mode', {}, {
    query: {
      method: 'GET',
      isArray: true,
      transformResponse: function(response) {
        if(angular.isDefined(response._embedded)) {
          return angular.fromJson(response)._embedded.worksheets;
        }
        else {
          return angular.fromJson(response);
        }
      }
    },
    create: {
      method:'POST'
    },
    update: {
      method:'PUT',
      transformRequest: function(request) {
        var transformedRequest = angular.copy(request);
        delete transformedRequest.groups;
        delete transformedRequest.area;
        delete transformedRequest.summary;
        return angular.toJson(transformedRequest);
      }
    },
    updateEntity: {
      method:'PUT',
      headers: { 'Content-Type': 'text/uri-list' }
    }
  });

});
