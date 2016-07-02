'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:CitylistCtrl
 * @description
 * # CitylistCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('CampaignList', function (Campaigns, $scope, $route) {

  var ctrl = this;

  ctrl.campaigns = [];
  ctrl.selectedCampaign = null;
  ctrl.newCampaign = {};

  /**
   * Get shapes from Nominatim:
   * http://nominatim.openstreetmap.org/search?city=Monnickendam&country=The%20Netherlands&format=json&polygon_geojson=1
   *
   * Returns array of OSM objects with embedded geojson
   */

  Campaigns.query({
    sort: ['active,desc', 'name,asc']
  }).$promise.then(function(result) {
    ctrl.campaigns = result;

    angular.forEach(ctrl.campaigns, function (campaign) {
      if(campaign.active === true) {
        ctrl.selectedCampaign = campaign;
      }
    });
  });

  $scope.$watch('ctrl.selectedCampaign', function (selectedCampaign, oldCampaign) {

    if(selectedCampaign !== null && oldCampaign !== null) {
      oldCampaign.active = false;
      selectedCampaign.active = true;

      Campaigns.update({id: oldCampaign.id}, oldCampaign).$promise.then(function () {
        Campaigns.update({id: selectedCampaign.id}, selectedCampaign).$promise.then(function () {
          $route.reload();
        });
      });
    }
  });

  ctrl.create = function() {

    Campaigns.create({},{
      active: false,
      name: ctrl.newCampaign.name
    }).$promise.then(function() {
      $route.reload();
    });

  };

});
