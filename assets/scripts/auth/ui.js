'use strict';

const app = require('../app-data.js');
const loadMap = require('../app/google_map_signin.js');
const loadBucket = require('../app/handlebars.js');
// const appApi = require('../app/api.js');
// const appUi = require('../app/ui.js');

const signOutSuccess = (data) => {
  console.log("User successfully signed out");
  app.user = data;
  console.log(app.user);
  $('#sign-out-modal').modal('hide');
  $('#signed-in-menu').hide();
  $('#sign-in-button').show();
  $('#sign-up-button').show();
  $('#username').text("Username");
  loadMap.clearMap();
};

const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app.user);
  console.log(data.user.email + " successfully signed in");
  $('#sign-in-modal').modal('hide');
  $('#signed-in-menu').css('visibility', 'visible');
  $('#sign-in-button').hide();
  $('#sign-up-button').hide();
  $('#username').text(app.user.email);
  loadMap.clearMap();
  loadMap.addPoints();
  loadBucket.loadBucket();
};

const changePWSuccess = (data) => {
  $('#change-pw-modal').modal('hide');
  console.log("Password successfully changed");
  console.log(data);
  // show div that says 'successfully changed password'
};

const changePWFail = (error) => {
  console.error(error);
  // show div that says 'error changing password'
};

const registerSuccess = (data) => {
  console.log("Registration successful");
  app.user = data.user;
  console.log(data.user);
  // call sign in function here
};

const success = (data) => {
  console.log(data);
};

const signInFail = (error) => {
  console.error(error);
  // show div that says 'Invalid e-mail or password'
};

const regFail = (error) => {
  console.error(error);
  // show div that says 'E-mail already registered. Please sign in or sign up with a different e-mail'
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  changePWSuccess,
  registerSuccess,
  signInFail,
  regFail,
  changePWFail
};
