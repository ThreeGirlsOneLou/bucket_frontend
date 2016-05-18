'use strict';

const app = require('../app-data.js');
const appApi = require('./api.js');
const appUi = require('./ui.js');

const addHandlers = () => {
  // Add to bucket list button clicked
  $('#add-button').on('click', function (event) {
    event.preventDefault();
    let name = $('#search-result-name').text();
    let user_id = app.user._id;
    let long = app.searchlong;
    let lat = app.searchlat;
    appApi.addUserLocation(appUi.addLocationSuccess,
                           appUi.addLocationFailure,
                           user_id, name, long, lat,
                           app.flickrURL);
    $(this).hide();
    $('#remove-button').show();
    $('#photo-ribbon').fadeIn("slow");
  });

  $('#location-list').on('click','.visited', function (event){
      event.preventDefault();
      let location_id = $(this).data('location-id');
      let currentLocation = $.grep(app.user.locations, function(e) {
        return e._id == location_id;
      });
      appApi.updateUserLocation(appUi.updateLocationSuccess,
                                appUi.updateLocationFailure,
                                app.user._id,
                                location_id,
                                (!currentLocation[0].visited));
      });

    $('#location-list').on('click','.remove', function (event){
      event.preventDefault();
      let location_id = $(this).data('location-id');
      console.log('delete triggered');
      appApi.deleteUserLocation(appUi.deleteLocationSuccess,
                                appUi.deleteLocationFailure,
                                app.user._id,
                                location_id);
      });

    $('#remove-button').on('click', function(event) {
      event.preventDefault();
      $(this).hide();
      $('#add-button').show();
      $('#photo-ribbon').fadeOut("slow");

      let location_id;
      for (let i = 0; i < app.user.locations.length; i++) {
        if (app.user.locations[i].name === app.searchaddress) {
          location_id = app.user.locations[i]._id;
        }
      }

      console.log(location_id);
      console.log("remove button clicked under photo");
      appApi.deleteUserLocation(appUi.deleteLocationSuccess,
                                appUi.deleteLocationFailure,
                                app.user._id,
                                location_id);
    });
};



module.exports = {
  addHandlers
};
