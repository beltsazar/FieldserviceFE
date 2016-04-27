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
      },
      headers: {
        'Authorization' : function () {
          return base64EncodedUsernamePassword;
        }
      }
    },
    account: {
      method:'GET',
      params: {
        mode: 'account'
      }
    },
    status: {
      method:'GET',
      params: {
        mode: 'status'
      }
    }
  });

  function login(username, password) {
    base64EncodedUsernamePassword = 'Basic ' + btoa(username + ':' + password);
    return resource.login();
  }

  return {
    login: login,
    account: resource.account,
    status: resource.status
  };

});
