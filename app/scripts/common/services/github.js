var app = app || {};
app.services = app.services || {};

(function(app) {
  'use strict';

  var API_URL = 'https://api.github.com';

  var github = {
    search: function(term) {
      return m.request({
          method: 'GET',
          url: API_URL + '/search/repositories?q=' + term
        })
        .then(function(data) {
          var repositories = _.sortByOrder(_.map(data.items, function(item) {
            return new app.models.searchResult(item);
          }), 'score', false);

          return repositories;
        });
    },
    get: function(owner, repo) {
      var repository = new app.models.repository();

      return m.request({
        method: 'GET',
        url: API_URL + '/repos/' + owner + '/' + repo
      }).then(function(data) {
        repository.parseData(data);

        return m.request({
            method: 'GET',
            url: API_URL + '/repos/' + owner + '/' + repo + '/contributors'
        }).then(function(data) {
          repository.setContributors(data);
          return repository;
        });
      });
    }
  };

  app.services.github = github;
})(app);
