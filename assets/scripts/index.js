'use strict';

// const appEvents = require('./app/events.js');
const authEvents = require('./auth/events.js');

// On document ready add handlers for events on page
$(() => {
  // appEvents.addHandlers();
  authEvents.addHandlers();
});
