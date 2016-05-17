'use strict';

const appEvents = require('./app/events.js');
const authEvents = require('./auth/events.js');
const loadMap = require('./app/google_map_signin');

// On document ready add handlers for events on page & load google map
$(() => {
  appEvents.addHandlers();
  authEvents.addHandlers();
  loadMap.loadMap();
});
