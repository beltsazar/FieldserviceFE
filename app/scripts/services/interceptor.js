'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Interceptor', function (Application) {

  return {
    responseError: function(response) {
      Application.isAuthorized = false;
      Application.showLogin = true;
      return response;
    }
  };

});
