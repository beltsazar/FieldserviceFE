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

    $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa(ctrl.username + ':' + ctrl.password);   //YWRtaW46YWRtaW4=';

    Authorisation.login().$promise.then(function(response) {

      $http.defaults.headers.common['X-XSRF-TOKEN'] = $cookies.get('XSRF-TOKEN');

      Application.account = response;

    }).catch(function(error) {
      ctrl.showAlert = true;

      $timeout(function() {
        ctrl.closeAlert();
      }, 5000);
    });

  };

  ctrl.closeAlert = function () {
    ctrl.showAlert = false;
  };


});
