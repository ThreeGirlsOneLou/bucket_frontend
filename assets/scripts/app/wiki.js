'use strict';

const getWikiInfo = (success, failure, searchTerm) => {
  $.ajax({
    method: 'GET',
    url:'https://en.wikipedia.org/w/api.php?action=query&prop=info&prop=extracts&exintro=&titles=' + searchTerm + '&format=json&redirects=',
    contentType: "application/json; charset=utf-8'",
    dataType: "jsonp",
    // origin: "http://www.foo.com"
  }).done(success)
    .fail(failure);
};

module.exports = {
  getWikiInfo,
};
