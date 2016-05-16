'use strict';




let searchTerm = $('#search-result-name').text();

const getPhotos = (getPhotosSuccess, getPhotosFailure, searchTerm) => {
  $.ajax({
    method: 'GET',
    url:'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=479994a81bb05629ca3986e2eb43abe6&tags=' + searchTerm  + '&per_page=1&format=json&nojsoncallback=1',
  }).done(getPhotosSuccess)
    .fail(getPhotosFailure);
};






module.exports = {
  getPhotos
};
