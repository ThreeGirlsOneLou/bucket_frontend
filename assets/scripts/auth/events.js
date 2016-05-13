'use strict';

// const getFormFields = require('../../../lib/get-form-fields');

const authApi = require('./api.js');
const authUi = require('./ui.js');

const addHandlers = () => {
  $('#sign-up').on('submit', function (event) {
    let data = getFormFields(this);
    event.preventDefault();
    authApi.signUp(authUi.registerSuccess, authUi.regFail, data);
  });
  $('#sign-in').on('submit', function(event) {
    let data = getFormFields(this);
    event.preventDefault();
    authApi.signIn(authUi.signInSuccess, authUi.signInFail, data);
  });
  $('#sign-out-form').on('submit', function(event) {
    event.preventDefault();
    authApi.signOut(authUi.signOutSuccess, authUi.failure);
  });
  $('#change-pw').on('submit', function(event) {
    event.preventDefault();
    let data = getFormFields(this);
    authApi.changePW(authUi.changePWSuccess, authUi.changePWFail, data);
  });
};

module.exports = {
  addHandlers
};
