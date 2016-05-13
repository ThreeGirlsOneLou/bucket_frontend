'use strict';

const app = require('../app-data.js');
// const appApi = require('../app/api.js');
// const appUi = require('../app/ui.js');

const signOutSuccess = (data) => {
  console.log("User successfully signed out");
  app.user = data;
  console.log(app.user);
};

const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app.user);
  console.log(data.user.email + " successfully signed in");
};

const changePWSuccess = (data) => {
  console.log("Password successfully changed");
  console.log(data);
  // $("#change-pw-modal").modal('hide');
  // $(".modal-backdrop").hide();
  // $("#success-pw-modal").modal('show');
};

const changePWFail = (error) => {
  console.error(error);
  // $("#change-pw-modal").modal('hide');
  // $("#pw-change-fail-modal").modal('show');
};

const registerSuccess = (data) => {
  console.log("Registration successful");
  // $("#sign-up-modal").modal('hide');
  // $("#success-reg-modal").modal('show');
  app.user = data.user;
  console.log(data.user);
};

const success = (data) => {
  console.log(data);
};

const signInFail = (error) => {
  console.error(error);
  // $("#log-in-modal").modal('hide');
  // $("#log-in-fail-modal").modal('show');
};

const regFail = (error) => {
  console.error(error);
  // $("#sign-up-modal").modal('hide');
  // $("#reg-fail-modal").modal('show');
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
