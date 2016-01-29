'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('CityDetails', function (Cities, $resource, $routeParams) {

  var ctrl = this;

  ctrl.city = {};

  Cities.get({id : $routeParams.id}).$promise.then(function(result) {
    ctrl.city = result;
  });

  this.saveCity = function() {
    Cities.update({id : $routeParams.id}, ctrl.city).$promise.then(function() {
    });
  };

  this.deleteCity = function() {
    Cities.delete({id : $routeParams.id}, ctrl.city).$promise.then(function() {
    });
  };

  this.newCity = function() {
    Cities.add({}, ctrl.city).$promise.then(function() {
    });
  };

});


//var result = City.get();
//CityResource.get().$promise.then(function(result) {
//  console.log(result);
//  ctrl.cities = result._embedded.cities;
//
//});
//
//this.model = {};
//
//this.gotoURL = function(some) {
//  console.log('hoi', some);
//}

//var city = new CityResource();
//
//city.name = this.model.name;
