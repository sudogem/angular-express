'use strict';

angular.module('myApp.view2', ['ngRoute', 'ngMap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', function($scope) {
  var map;
  var markers = [];
  
  initialize();

  function initialize() {
    console.info('initialize');
    var myLatlng = new google.maps.LatLng(10.309907522479866, 123.89312267303467); // fuente circle
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

});