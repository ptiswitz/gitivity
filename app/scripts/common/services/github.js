var app = app || {};
app.services = app.services || {};

(function(app) {
  'use strict';

  var API_URL = 'https://api.github.com',
      API_TOKEN = '181b79075eac95ecd7f2383ad4f0b846c632d417',
      github = {
        search: function(term) {
          return m.request({
              method: 'GET',
              url: API_URL + '/search/repositories?q=' + term + '&=access_token=' + API_TOKEN
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
            url: API_URL + '/repos/' + owner + '/' + repo + '?access_token=' + API_TOKEN
          }).then(function(data) {
            repository.parseData(data);

            return m.request({
                method: 'GET',
                url: API_URL + '/repos/' + owner + '/' + repo + '/contributors?per_page=100&access_token=' + API_TOKEN
            }).then(function(data) {
              repository.setContributors(data);

              return m.request({
                method: 'GET',
                url: API_URL + '/repos/' + owner + '/' + repo + '/commits?per_page=100&access_token=' + API_TOKEN
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
