'use strict';

/**
 * @ngdoc overview
 * @name fieldserviceFeApp
 * @description
 * # fieldserviceFeApp
 *
 * Main module of the application.
 */
angular
  .module('fieldserviceFeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/cities', {
        templateUrl: 'views/city_list.html',
        controller: 'CityList',
        controllerAs: 'ctrl'
      })
      .when('/cities/:id', {
        templateUrl: 'views/city_details.html',
        controller: 'CityDetails',
        controllerAs: 'ctrl'
      })
      .when('/addresses', {
        templateUrl: 'views/address_list.html',
        controller: 'AddressList',
        controllerAs: 'ctrl'
      })
      .when('/addresses/:id', {
        templateUrl: 'views/address_details.html',
        controller: 'AddressDetails',
        controllerAs: 'ctrl'
      })
      .when('/streets', {
        templateUrl: 'views/street_list.html',
        controller: 'StreetList',
        controllerAs: 'ctrl'
      })
      .when('/streets/:id', {
        templateUrl: 'views/street_details.html',
        controller: 'StreetDetails',
        controllerAs: 'ctrl'
      })
      .when('/areas', {
        templateUrl: 'views/area_list.html',
        controller: 'AreaList',
        controllerAs: 'ctrl'
      })
      .when('/areas/:id', {
        templateUrl: 'views/area_details.html',
        controller: 'AreaDetails',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
