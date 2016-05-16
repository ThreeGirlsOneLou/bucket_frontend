'use strict';




let searchTerm = $('#search-result-name').text();

const getPhotos = (getPhotosSuccess, getPhotosFailure, searchTerm) => {
  $.ajax({
    method: 'GET',
    url:'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7b1259ac0fc9a1d13b2e4e76b1a3ca&tags=' + searchTerm  + '&per_page=1&format=json&nojsoncallback=1',
  }).done(getPhotosSuccess)
    .fail(getPhotosFailure);
};

$('#signOut').on('click', function (event) {
  event.preventDefault();
});




module.exports = {
  getPhotos
};
