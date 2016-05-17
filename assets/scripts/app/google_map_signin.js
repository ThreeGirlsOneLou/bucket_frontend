'use strict';

const app = require('../app-data.js');
const flickr = require('./flickr.js');
let map;
let markers = [];
let mapReload = 0;

// function to add the search and autocomplete to map
const addSearchBar = function(map) {
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

  const ui = require('./ui.js');

  // Create the autocomplete helper, and associate it with
  // an HTML text input box.
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  let image = {
    path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
    fillColor: '#2fa1c4',
    fillOpacity: .8,
    anchor: new google.maps.Point(0,0),
    strokeWeight: 0,
    scale: 0.5
  }

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    icon: image
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

    // save current search data
    app.searchname = place.name;
    app.searchaddress = place.formatted_address;
    app.searchlat = place.geometry.location.lat();
    app.searchlong = place.geometry.location.lng();

    $('#search-result-name').text(place.formatted_address);

    // call flikr API
    flickr.getPhotos(ui.getPhotosSuccess, ui.getPhotosFailure, $('#search-result-name').text() );
  });
};

const loadMap = function() {

  $(window).load(function(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.364506, lng: -71.038887},
      zoom: 13,
      scrollwheel: false
    });

    addSearchBar(map);
  });

};

const addPoints = function() {

    let locations = app.user.locations;
    console.log(locations);

    if (locations.length > 0) {
      var infowindow = new google.maps.InfoWindow;
      var marker, i;
      var bounds = new google.maps.LatLngBounds();
      let image = {
        path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
        fillColor: '#FF0000',
        fillOpacity: .6,
        anchor: new google.maps.Point(0,0),
        strokeWeight: 0,
        scale: 0.5
      }

      for (i = 0; i < locations.length; i++) {

        if (locations[i].visited === true) { image.fillColor = '#329f72';}

          marker = new google.maps.Marker({
               position: new google.maps.LatLng(locations[i].coords.lat, locations[i].coords.long),
               map: map,
               icon: image
          });

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
               return function() {
                   infowindow.setContent('<div><strong>' + locations[i].name + '</strong></div>');
                   infowindow.open(map, marker);
               };
          })(marker, i));

          bounds.extend(marker.getPosition());
          markers.push(marker);

          if (mapReload > 0 && i === locations.length - 1) {
            marker.setAnimation(4);
          }

      }

      map.fitBounds(bounds);
    }

    mapReload += 1;
};

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
const clearMap = function() {
  clearMarkers();
  markers = [];
}

module.exports = {
  loadMap,
  addPoints,
  clearMap
};
