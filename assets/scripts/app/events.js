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
};



module.exports = {
  addHandlers
};
