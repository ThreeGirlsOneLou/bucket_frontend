'use strict';

const app = require('../app-data.js');
const loadMap = require('../app/google_map_signin.js');
const loadBucket = require('./handlebars.js');
const appApi = require('./api.js');

const getLocationsSuccess = (data) => {
  console.log('win');
  console.log(data, 'from get Location Success');
  app.user.locations = data.locations;
  loadBucket.loadBucket();
  loadMap.clearMap();
  loadMap.addPoints();
};

const getLocationsFailure = (data) => {
  console.log('you fail');
  console.log(data);

};

const addLocationSuccess = (data) => {
  console.log('Success');
  console.log(data);
  app.user.locations = data.user.locations;
  app.addLocation = true;
  loadBucket.loadBucket();
  loadMap.clearMap();
  loadMap.addPoints();
  console.log('add location success ' + app.addLocation);
};

const addLocationFailure = (data) => {
  console.log('you fail');
  console.log(data);

};

const getPhotosFailure = (data) => {
  console.log('get photos failed');
  console.log(data);

};

const getPhotosSuccess = (data) => {
  console.log('Photo Success');
  console.log(data);
  app.photos = data.photos.photo[0];
  app.flickrURL = 'http://farm' + app.photos.farm + '.static.flickr.com/' + app.photos.server + '/' + app.photos.id + '_' + app.photos.secret + '.jpg';
  console.log(app.flickrURL);
  $('#photoResult').html('<img id="flickrResult" src="' + app.flickrURL + '">');

};

const updateLocationSuccess = (data) => {
  console.log('Update location Success');
  console.log(data);
  app.user.locations = data.user.locations;
  loadBucket.loadBucket();
  loadMap.clearMap();
  loadMap.addPoints();
};

const updateLocationFailure = (data) => {
  console.log('Update location Failure');
  console.log(data);
};

const deleteLocationSuccess = (data) => {
  console.log('Delete location success');
  console.log(data, 'from delete');
  appApi.getUserLocations(getLocationsSuccess,
                          getLocationsFailure,
                          app.user._id);
  app.addLocation = false;
};

const deleteLocationFailure = (data) => {
  console.log('Delete location Failure');
  console.log(data);
};

const getWikiInfoFailure = (data) => {
  console.log(data);
};

const getWikiInfoSuccess = (data) => {
  console.log(data);
  let id = {};
  for (var first in data.query.pages){
    id = first;
    break;
  }
  $('#wiki-info-title').html(data.query.pages[id].title);
  $('#wiki-content').html(data.query.pages[id].extract);
};

module.exports = {
  getLocationsSuccess,
  getLocationsFailure,
  addLocationSuccess,
  addLocationFailure,
  getPhotosFailure,
  getPhotosSuccess,
  updateLocationFailure,
  updateLocationSuccess,
  deleteLocationSuccess,
  deleteLocationFailure,
  getWikiInfoSuccess,
  getWikiInfoFailure
};
