'use strict';

const app = require('../app-data.js');

const loadBucket = () => {
  console.log("Loaded dat bucket");
  let handlebarsTemplate = require('../templates/bucket-list.handlebars');
  let locations = app.user.locations;
  $('#location-list').children().remove();
  $('#location-list').append(handlebarsTemplate({
    locations: locations
  }));
};

module.exports = {
  loadBucket
};
