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
    appApi.addUserLocation(appUi.addLocationSuccess, appUi.addLocationFailure, user_id, name, long, lat);
  });
};

module.exports = {
  addHandlers
};
