'use strict';

/**
 * @ngdoc overview
 * @name fieldserviceFeApp
 * @description
 * # fieldserviceFeApp
 *
 * Main module of the application.
 */
moment.locale('nl');

angular
  .module('fieldserviceFeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/admin/cities', {
        templateUrl: 'views/city_list.html',
        controller: 'CityList',
        controllerAs: 'ctrl'
      })
      .when('/admin/cities/:id', {
        templateUrl: 'views/city_details.html',
        controller: 'CityDetails',
        controllerAs: 'ctrl'
      })
      .when('/admin/addresses', {
        templateUrl: 'views/address_list.html',
        controller: 'AddressList',
        controllerAs: 'ctrl'
      })
      .when('/admin/addresses/:id', {
        templateUrl: 'views/address_details.html',
        controller: 'AddressDetails',
        controllerAs: 'ctrl'
      })
      .when('/admin/streets', {
        templateUrl: 'views/street_list.html',
        controller: 'StreetList',
        controllerAs: 'ctrl'
      })
      .when('/admin/streets/:id', {
        templateUrl: 'views/street_details.html',
        controller: 'StreetDetails',
        controllerAs: 'ctrl'
      })
      .when('/admin/areas', {
        templateUrl: 'views/area_list.html',
        controller: 'AreaList',
        controllerAs: 'ctrl'
      })
      .when('/admin/areas/:id', {
        templateUrl: 'views/area_details.html',
        controller: 'AreaDetails',
        controllerAs: 'ctrl'
      })
      .when('/admin/assignments', {
        templateUrl: 'views/assignment_list.html',
        controller: 'AssignmentList',
        controllerAs: 'ctrl'
      })
      .when('/admin/assignments/:id', {
        templateUrl: 'views/assignment_details.html',
        controller: 'AssignmentDetails',
        controllerAs: 'ctrl'
      })
      .when('/worksheets/:id', {
        templateUrl: 'views/worksheet.html',
        controller: 'WorksheetDetails',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
