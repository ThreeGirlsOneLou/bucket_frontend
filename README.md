# Wanderlist Frontend




Backend Repo: https://github.com/ThreeGirlsOneLou/bucket_backend

Deployed Frontend: ______________________________

Our group created an app, Wanderlist, based on the idea of a "bucket list".  A bucket list is a list of life experiences that a person wants to pursue.  We took this and narrowed the scope, making an app that focuses on a location that user wants to visit.  A registered user searches a location on an embedded Google map and the Flickr API will return a photo tagged with that location name and Wikipedia will return it's wiki entry.  The user can then add it to their wanderlist.  After visiting that location, the user can mark it as 'visited', or even remove it from their list entirely.

To build this app we used Node, Express, Mongo, Handlebars, Flexbox, Javascript, HTML5, CSS3 and Bootstrap.  We connected to the Google Maps, Google Places, Flickr, and Wikipedia APIs.

Our approach began with basic HTML and CSS after completing our user stories and wireframes.  From there, we built the back end using two models, Users and Locations.  The locations model is a subdocument inside of users.  As a user accrues locations, the locations get embedded as arrays, each location as an object.

Next, we began on the frontend, integrating the Google Maps API.  After that was achieved, we connected to the Flickr API.  We scaled down our expectations of the Flickr API and chose to request only one photo instead of placing five photos inside of a carousel.  After this, we began working on saving locations to a user's list and representing the list items with Flickr's search result image.  After working on our CSS, we added small details to the map using the Google Places API such as adding pins to saved locations, changing the color of those pins based on whether a user has visited that location, and autocompleting search entries among other special effects.  Finally, before final CSS touches, we created an option for users to request the Wikipedia entry for that location.

Some obstacles we encountered were accidentally working on the development branch, deploying to Heroku, and querying the Flickr API to return relevant images.  Another challenge was appending the Wikipedia entry to a modal.  One problem that remained unsolved was how to prevent the landing page video from flashing black in between segments.

## Wireframes

http://imgur.com/a/yzh0V

## User Stories

As a user I want …
  An easily navigable, intuitive interface
  Be able to sign up/in, sign out and change my password
  To be able to log in and save places to my bucket list
  To be able to search and ‘bookmark’ locations for my bucket list
  To view all my bookmarked locations on a map
  To be able to mark when I’ve visited a location on my bucket list
  To be able to click on a place I’ve added to my list and see photos of that locale
  To be able to remove locations from my bucket list if I’ve changed my mind

## ERD

Users have many locations.  The locations schema is embedded in the users schema.

http://imgur.com/h7EgPUh
