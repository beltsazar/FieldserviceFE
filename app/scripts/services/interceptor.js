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
      if (response.status === 401 || response.status === -1) {
        Application.isAuthorized = false;
        Application.showLogin = true;
      }
      else {
        Application.showErrorMessage = true;
        Application.errorMessageText = response.statusText;
      }
      return response;
    }
  };

});
