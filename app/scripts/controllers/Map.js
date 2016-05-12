/* global L */

'use strict';

/**
 * @ngdoc function
 * @name fieldserviceFeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fieldserviceFeApp
 */
angular.module('fieldserviceFeApp').controller('Map', function ($scope, leafletData) {

  var ctrl = this;
  var area1_data = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [[5.04347026348114, 52.447048378410564], [5.044382214546204, 52.44780364551363], [5.046104192733765, 52.44727724859723], [5.045245885848999, 52.44635849108186], [5.04347026348114, 52.447048378410564]]
      ]
    }
  };

  var area2_data =
  {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {description: 'Dit is een gebiedje'},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[5.04347026348114, 52.447048378410564], [5.044382214546204, 52.44780364551363], [5.046104192733765, 52.44727724859723], [5.045245885848999, 52.44635849108186], [5.04347026348114, 52.447048378410564]]]
      }
    },
      {"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[5.044312477111816,52.44708434380439],[5.045047402381897,52.44687182059691],[5.045353174209595,52.44722493551656],[5.044537782669067,52.44750284804599],[5.044312477111816,52.44708434380439]]]}},

      {
        "type": "Feature",
        "properties": {color: 'yellow', description: 'Dit is een tekst!!!!'},
        "geometry": {"type": "Point", "coordinates": [5.044752359390259, 52.44721512680701]}
      }

    ]
  };

  var area3_data = {"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[

    [[5.0434809923172,52.44700914340205],[5.044022798538208,52.44667237480803],[5.044537782669067,52.44628001980083],[5.043084025382996,52.445449523508245],[5.042622685432434,52.44583534656791],[5.0429767370224,52.446047874776006],[5.042510032653808,52.44639772666995],[5.0434809923172,52.44700914340205]],
    [[5.043073296546936,52.446325794731756],[5.043625831604004,52.4460086388763],[5.044054985046387,52.44624732339248],[5.043556094169617,52.44658736485304],[5.043073296546936,52.446325794731756]]

  ]}};



  //$scope.geoJSON = {
  //  data: area
  //
  //}


  angular.extend($scope, {
    center: {
      "lat": 0, //52.44662006100898,
      "lng": 0, //5.0449588894844055,
      "zoom": 1,

    },
    defaults: {
      tileLayerOptions: {
        opacity: 1,
        detectRetina: true,
        reuseTiles: true
      }
    }
  });

console.log('leafletData', leafletData)
$scope.activeFeatureGroup;




  leafletData.getMap().then(function (map) {

    function onLocationFound(e) {
      var radius = e.accuracy / 2;

      L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

      L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', onLocationFound);

    $scope.$on('leafletDirectiveMap.locationfound', function(event, e) {
      onLocationFound(e.leafletEvent);
      console.log(e.leafletEvent);
    })

    var drawControl

    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    var area2 = L.geoJson(area2_data, {
      style: {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
      },
      onEachFeature: function (feature, layer) {

        layer.bindPopup(feature.properties.description);


      }
    }).on('click', function(event) {

      if (angular.isDefined(drawControl)) {
        map.removeControl(drawControl);
      };
     // console.log('Clicked on a group!', event, this);
     // drawnItems = this;
      $scope.activeFeatureGroup = 'Area2';

      var area = this;


      drawControl = new L.Control.Draw({
        edit: {
          featureGroup: area
        },
        draw: {
          //polyline: null,
          polygon: {
            showArea: true
          }
        }
      });






      map.addControl(drawControl);

      //var drawnItems = area;
      map.on('draw:created', function (e) {

        var layer = e.layer;
        area.addLayer(layer);

        console.log(JSON.stringify(layer.toGeoJSON()));
      });



    }).addTo(map);

    var area3 = L.geoJson(area3_data, {
      style: function (feature) {
        return {color: feature.properties.color};
      },
      onEachFeature: function (feature, layer) {

        layer.bindPopup(feature.properties.description);

      }
    }).on('click', function(event) {

      // console.log('Clicked on a group!', event, this);
      // drawnItems = this;
      $scope.activeFeatureGroup = 'Area3';

    }).addTo(map);



  });



//    var marker = L.marker([52.44721512680701, 5.044752359390259]).bindPopup('sdsdsd', {autoClose:false})
//    marker.addTo(map);
//marker.openPopup();
//    console.log('marker', marker)



    leafletData.getLayers().then(function (baselayers) {


  });

});
