'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Authorisation', function ($resource, config) {
  var base64EncodedUsernamePassword, resource = $resource(config.api.hostname + '/authorisation/:mode', {}, {
    login: {
      method:'GET',
      params: {
        mode: 'login'
      }
    },
    loginWithCredentials: {
      method:'GET',
      params: {
        mode: 'login'
      },
      headers: {
        'Authorization' : function () {
          return base64EncodedUsernamePassword;
        }
      }
    }
  });

  function loginWithCredentials(username, password) {
    base64EncodedUsernamePassword = 'Basic ' + btoa(username + ':' + password);
    return resource.loginWithCredentials();
  }

  return {
    loginAutomatic: resource.login,
    loginWithCredentials: loginWithCredentials
  };

});
