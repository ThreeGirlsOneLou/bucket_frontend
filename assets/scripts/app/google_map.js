'use strict';

 function initMap() {
   var mapOptions = {
     center: {lat: -33.8688, lng: 151.2195},
     zoom: 13,
     scrollwheel: false
   };
   var map = new google.maps.Map(document.getElementById('map'),
     mapOptions);
 }
