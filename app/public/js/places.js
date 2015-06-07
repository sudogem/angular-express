// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

function initialize() {
  console.info('initialize')
  var markers = [];
  // var myLatlng = new google.maps.LatLng(10.299498727884336, 123.87894585728645); // 7eleven katipunan
  var myLatlng = new google.maps.LatLng(10.302347504193767, 123.88662099838257); // Queensland v.rama
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    // center: new google.maps.LatLng(-33.8474, 151.2631),
    // center: new google.maps.LatLng( 10.3003418, 123.88159010000004),
    center: myLatlng,
    // center: new google.maps.LatLng(10.309812, 123.893180),
    zoom: 15
  });

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'lorem ipsum dolor sit amet consecteture, adispicing elit'
  });


  // var defaultBounds = new google.maps.LatLngBounds(
  //     new google.maps.LatLng(-33.8902, 151.1759),
  //     new google.maps.LatLng(-33.8474, 151.2631));
  // map.fitBounds(defaultBounds);

  // var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(10.309812, 123.893180));
  // map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      console.info('places_changed:')
      console.info('position=', marker.position);
      console.info('map=', marker.map);
      // console.info('marker.position.A=', marker.position.A);
      // console.info('marker.position.F=', marker.position.F);
      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
  });


  // This event listener will call addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    deleteMarkers();
    addMarker(event.latLng);
  });

  
  // Add a marker to the map and push to the array.
  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    console.info('addMarker:')
    console.info('marker=', marker.position);

    markers.push(marker);
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


// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}




  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
