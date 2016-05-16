'use strict';

const app = require('../app-data.js');

const addSearchBar = function(map) {
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

  // Create the autocomplete helper, and associate it with
  // an HTML text input box.
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });

  // Get the full place details when the user selects a place from the
  // list of suggestions.
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    // if (place.geometry.viewport) {
    //   map.fitBounds(place.geometry.viewport);
    // } else {
      map.setCenter(place.geometry.location);
      map.setZoom(10);
    // }

    // Set the position of the marker using the place ID and location.
    marker.setPlace(/** @type {!google.maps.Place} */ ({
      placeId: place.place_id,
      location: place.geometry.location
    }));
    marker.setVisible(true);

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        place.formatted_address + '</div>');
    infowindow.open(map, marker);

    $('#search-result-name').text(place.formatted_address);
  });
}

const mapAddPoints = function() {

  let locations = app.user.locations;
  console.log(locations);

  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    scrollwheel: false
  });

  var infowindow = new google.maps.InfoWindow;

  var marker, i;

  var bounds = new google.maps.LatLngBounds();

  addSearchBar(map);

  // var goldStar = {
  //   path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
  //   fillColor: 'yellow',
  //   fillOpacity: 1,
  //   scale: 0.2,
  //   strokeColor: 'gold',
  //   strokeWeight: 1
  // };

  for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
           position: new google.maps.LatLng(locations[i].coords.lat, locations[i].coords.long),
          //  icon: goldStar,
           map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
           return function() {
               infowindow.setContent('<div><strong>' + locations[i].name + '</strong></div>');
               infowindow.open(map, marker);
           };
      })(marker, i));

      bounds.extend(marker.getPosition());
  }

  map.fitBounds(bounds);
  map.setZoom(10);

};

module.exports = {
  mapAddPoints
};
