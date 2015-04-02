var app = app || {};
app.services = app.services || {};

(function(app) {
  'use strict';

  var github = {
    search: function(term) {
      return m.request({
          method: 'GET',
          url: 'https://api.github.com/search/repositories?q=' + term
        })
        .then(function(data) {
          var repositories = _.sortByOrder(_.map(data.items, function(item) {
            return new app.models.searchResult(item);
          }), 'score', false);

          return repositories;
        });
    }
  };

  app.services.github = github;
})(app);
