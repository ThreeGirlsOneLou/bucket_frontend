'use strict';

const app = require('../app-data.js');
const flickr = require('./flickr.js');
const wiki = require('./wiki.js');
let map;
let markers = [];
let locations;
let searchMarker;
let searchInfowindow;

let mapStyle = [{"featureType":"all","elementType":"labels.text","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#231f20"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"weight":"2.19"},{"saturation":"11"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#9cd8d2"},{"visibility":"on"}]}];

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
    fillColor: '#832fc4',
    fillOpacity: .8,
    anchor: new google.maps.Point(0,0),
    strokeWeight: 0,
    scale: 0.5
  }

  searchInfowindow = new google.maps.InfoWindow();
  searchMarker = new google.maps.Marker({
    map: map,
    icon: image
  });
  google.maps.event.addListener(searchMarker, 'click', function() {
    searchInfowindow.open(map, searchMarker);
  });

  // Get the full place details when the user selects a place from the
  // list of suggestions.
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    searchInfowindow.close();
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
    searchMarker.setPlace(/** @type {!google.maps.Place} */ ({
      placeId: place.place_id,
      location: place.geometry.location
    }));
    searchMarker.setVisible(true);

    searchInfowindow.setContent('<div><strong>' + place.formatted_address + '</strong><br>');
    searchInfowindow.open(map, searchMarker);

    // save current search data
    app.searchname = place.name;
    app.searchaddress = place.formatted_address;
    app.searchlat = place.geometry.location.lat();
    app.searchlong = place.geometry.location.lng();

    $('#search-result-name').text(place.formatted_address);

    let inList = false;

    for (let i = 0; i < locations.length; i++) {
      if (locations[i].name === place.formatted_address) {
        inList = true;
        // app.locationSearchID = locations[i]._id;
        console.log ('place already in list');
      }
    }

    if (inList === true) {
      $('#add-button').hide();
      $('#remove-button').show();
      $('#info-button').show();
      setTimeout(function() {
        $('#photo-ribbon').fadeIn("slow");
      }, 500);
      // })$('#photo-ribbon').setTimeout($(this).fadeIn("slow"), 1000);
    } else {
      $('#remove-button').hide();
      $('#add-button').show();
      $('#photo-ribbon').fadeOut("slow");
      $('.infoSection').hide();
      $('#info-button').show();
    }

    // call flikr API
    flickr.getPhotos(ui.getPhotosSuccess, ui.getPhotosFailure, $('#search-result-name').text());
    let searchAry = $('#search-result-name').text().split(',');
    wiki.getWikiInfo(ui.getWikiInfoSuccess,
                     ui.getWikiInfoFailure,
                     searchAry[0]);
  });
};

const loadMap = function() {

  $(window).load(function(){
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.364506, lng: -71.038887},
      zoom: 13,
      scrollwheel: false,
      styles: mapStyle
    });

    addSearchBar(map);
  });

};

const addPoints = function() {
    locations = app.user.locations;
    console.log(locations);

    if (locations.length > 0) {
      var infowindow = new google.maps.InfoWindow;
      var marker, i;
      var bounds = new google.maps.LatLngBounds();
      let image = {
        path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
        fillOpacity: .6,
        anchor: new google.maps.Point(0,0),
        strokeWeight: 0,
        scale: 0.5
      };

      for (i = 0; i < locations.length; i++) {

        if (locations[i].visited === true) {
          image.fillColor = '#0952cf';
        } else {
          image.fillColor = '#FF0000';
        }

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

          console.log('appLocation =' + app.addLocation);
          if (app.mapReload === 0) {
            window.setTimeout(marker.setAnimation(google.maps.Animation.DROP), i*500);
          } else if (app.addLocation === true && i === locations.length - 1) {
            marker.setAnimation(4);
          }
      }
      app.mapReload += 1;
      console.log('map reload = ' + app.mapReload);
      map.fitBounds(bounds);
    }

    if (locations.length === 1) { map.setZoom(10) };
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
  searchMarker.setVisible(false);
  searchInfowindow.close();
};

module.exports = {
  loadMap,
  addPoints,
  clearMap,
};
