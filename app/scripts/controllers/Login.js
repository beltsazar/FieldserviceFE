'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('Login', function ($resource, $http, $cookies, $timeout, Application, Authorisation) {

  var ctrl = this;

  ctrl.showAlert = false;

  ctrl.login = function () {

    Authorisation.login(ctrl.username, ctrl.password).$promise.then(function (response) {

      if (response.authenticated) {

        Authorisation.account().$promise.then(function (response) {
          Application.account = response;
          Application.isAuthorized = true;
          Application.showLogin = false;

          // Right cookie is only here first available, why !?
          $http.defaults.headers.common['X-XSRF-TOKEN'] = $cookies.get('XSRF-TOKEN');
        });
      }
      else {
        ctrl.showAlert = true;
        $timeout(function () {
          ctrl.closeAlert();
        }, 5000);
      }

    }).catch(function() {

    }).finally(function() {

    });

    ctrl.closeAlert = function () {
      ctrl.showAlert = false;
    };

  };

});
