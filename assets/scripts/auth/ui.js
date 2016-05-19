'use strict';

const app = require('../app-data.js');
const loadMap = require('../app/google_map_signin.js');
const loadBucket = require('../app/handlebars.js');
const authApi = require('./api.js');
// const appApi = require('../app/api.js');
// const appUi = require('../app/ui.js');

const signOutSuccess = (data) => {
  $('#navbar').hide();
  console.log("User successfully signed out");
  app.user = data;
  console.log(app.user);
  $('#sign-out-modal').modal('hide');
  $('#signed-in-menu').css('visibility', 'hidden');
  $('#sign-in-button').show();
  $('#sign-up-button').show();
  $('#username').text("Username");
  $('#photoResult').html('');
  $('#search-result-name').text('');
  $('#add-button').hide();
  $('#remove-button').hide();
  $('html, body').css('overflow-y', 'hidden');
  $('html, body').css('overflow-x', 'hidden');
  $('#info-button').hide();
  loadMap.clearMap();
  $('#sign-in').each(function(){
     this.reset();
   });
  $('#pac-input').val('');
  $('#photo-ribbon').fadeOut("slow");
  app.mapReload = 0;
};



const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app.user);
  console.log(data.user.email + " successfully signed in");
  $('#navbar').fadeIn("slow");
  $('#sign-in-modal').modal('hide');
  $('#signed-in-menu').css('visibility', 'visible');
  $('#sign-in-button').hide();
  $('#sign-up-button').hide();
  $('#username').text(app.user.email);
  // $('#landing-page').css("display", "none");
  $('html, body').css('overflow-y', 'visible');
  $('html, body').css('overflow-x', 'visible');
  $('html, body').animate({
    scrollTop: $('.flickr_row').offset().top - 20
  }, 1000);
  // $('body').css('overflow-y', 'auto');
  // $('#map').scrollTop(1000);
  app.mapReload = 0;
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
  $('#change-pw-modal-content').append('<div class="alert alert-danger" role="alert">Error changing password</div>');
  setTimeout(function(){
    $('#change-pw-modal-content > .alert').hide();
  }, 3000);
  // show div that says 'error changing password'
};

const registerSuccess = (data) => {
  console.log("Registration successful");
  app.user = data.user;
  console.log(data.user);
  console.log(app.signUpData);
  authApi.signIn(signInSuccess,signInFail,app.signUpData);
  $('#sign-up-modal').modal('hide');

  // call sign in function here
};

const success = (data) => {
  console.log(data);
};

const signInFail = (error) => {
  console.error(error);
  $('#signInModalContent').append('<div class="alert alert-danger" role="alert">Invalid e-mail or password</div>');
  setTimeout(function(){
    $('#signInModalContent> .alert').hide();
  }, 3000);
  // show div that says 'Invalid e-mail or password'
};

const regFail = (error) => {
  console.error(error);
  $('#registerModalContent').append('<div class="alert alert-danger" role="alert">E-mail already registered. Please sign in or sign up with a different e-mail.</div>');
  setTimeout(function(){
    $('#registerModalContent> .alert').hide();
  }, 3000);
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
