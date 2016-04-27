'use strict';

/**
 * @ngdoc service
 * @name fieldserviceFeApp.city
 * @description
 * # city
 * Factory in the fieldserviceFeApp.
 */
angular.module('fieldserviceFeApp').factory('Application', function () {

  function hasRole(level) {
    /* USER, ADMIN, ROOT */
    if (application.account === null) {
      return false;
    }

    if (angular.equals(level,'ROOT')) {
      return angular.equals(application.account.role, 'ROOT');
    }

    if (angular.equals(level,'ADMIN')) {
      return angular.equals(application.account.role, 'ROOT') || angular.equals(application.account.role, 'ADMIN');
    }

    if (angular.equals(level,'USER')) {
      return angular.equals(application.account.role, 'ROOT') || angular.equals(application.account.role, 'ADMIN') || angular.equals(application.account.role, 'USER');
    }

    return false;
  }

  var application = {
    account: null,
    isAuthorized: false,
    showLogin: false,
    hasRole: hasRole
  };

  return application;

});
