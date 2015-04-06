var app = app || {};
app.services = app.services || {};

(function(app) {
  'use strict';

  var API_URL = 'https://api.github.com',
      API_TOKEN = '7b4c0e685ee189c15c0cf785db17c43032cedcc8',
      github = {
        search: function(term) {
          return m.request({
              method: 'GET',
              url: API_URL + '/search/repositories?q=' + term + '&=api_token=' + API_TOKEN
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
                url: API_URL + '/repos/' + owner + '/' + repo + '/contributors?per_page=100&api_token=' + API_TOKEN
            }).then(function(data) {
              repository.setContributors(data);

              return m.request({
                method: 'GET',
                url: API_URL + '/repos/' + owner + '/' + repo + '/commits?per_page=100&api_token=' + API_TOKEN
              }).then(function(data) {
                repository.setCommits(data);
                
                return repository;
              });
            });
          });
        }
      };

  app.services.github = github;
})(app);
