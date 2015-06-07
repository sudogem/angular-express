'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngMap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
.controller('View1Ctrl', function($scope) {
  var map;
  var markers = [];

  initialize();
  $scope.types = "['establishment']";

  $scope.placeChanged = function() {
    $scope.place = this.getPlace();
    setLocation($scope.place);
  };

  function initialize() {
    console.info('initialize');
    var myLatlng = new google.maps.LatLng(10.302347504193767, 123.88662099838257); // Queensland v.rama
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: myLatlng,
      zoom: 15
    });

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'lorem ipsum dolor sit amet consecteture, adispicing elit'
    });
  }

  function setLocation(details) {
    console.info(details);
    var A = details.geometry.location.A;
    var F = details.geometry.location.F;
    var myLatlng = new google.maps.LatLng(A, F);
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: myLatlng,
      zoom: 15
    });

    // This event listener will call addMarker() when the map is clicked.
    google.maps.event.addListener(map, 'click', function(event) {
      deleteMarkers();
      addMarker(event.latLng, map, details.formatted_address);
    });
  }

  // Add a marker to the map and push to the array.
  function addMarker(location, map, formatted_address) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: formatted_address
    });
    console.info('location:', location)
    markers.push(marker);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }  

  function clearMarkers() {
    setAllMap(null);
  }

  // Sets the map on all markers in the array.
  function setAllMap(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

});

