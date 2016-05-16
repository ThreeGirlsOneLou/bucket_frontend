'use strict';

const app = require('../app-data.js');

const getLocationsSuccess = (data) => {
  console.log('win');
  console.log(data);
};

const getLocationsFailure = (data) => {
  console.log('you fail');
  console.log(data);

};

const addLocationSuccess = (data) => {
  console.log('Success');
  console.log(data);

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
  


};

module.exports = {
  getLocationsSuccess,
  getLocationsFailure,
  addLocationSuccess,
  addLocationFailure,
  getPhotosFailure,
  getPhotosSuccess


};
