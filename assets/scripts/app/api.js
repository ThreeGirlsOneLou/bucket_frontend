'use strict';

const app = require('../app-data.js');

const getUserLocations = (success, failure, user_id) => {
  $.ajax({
    method: 'GET',
    url: app.api + '/user_locations?user_id=' + user_id,
    headers: {
    "Content-Type": "application/json",
  },
  }).done(success)
    .fail(failure);
};

const addUserLocation = (success, failure, user_id, name, long, lat, url) => {
  console.log('add location request queued');
  $.ajax({
    method: 'POST',
    url: app.api + '/locations',
    data: {
      user: {
        id: user_id,
      },
      location: {
        name: name,
        coords: {
          long: long,
          lat: lat
        },
        url: url
      }
    },
    headers: {
    "Content-Type": "application/json",
  },
    headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  }).done(success)
    .fail(failure);
};

const deleteUserLocation = (success, failure, user_id, location_id) => {
  $.ajax({
    method: 'DELETE',
    url: app.api + '/locations/' + location_id,
    data: {
      user: {
        id: user_id
      },
      location: {
        id: location_id
      }
    },
    headers: {
    "Content-Type": "application/json",
  },
    headers: {
    Authorization: 'Token token=' + app.user.token,
  },
  }).done(success)
    .fail(failure);
};

const updateUserLocation = () => {

};

module.exports = {
  getUserLocations,
  addUserLocation,
  deleteUserLocation,
  updateUserLocation,
};
