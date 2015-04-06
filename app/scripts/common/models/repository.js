var app = app || {};
app.models = app.models || {};

(function(app) {
  'use strict';

  var Repository = function() {
    this.id = 0;
    this.name = '';
    this.fullName = '';
    this.description = '';
    this.language = '';
    this.url = '';
    this.owner = new app.models.user();
    this.contributors = [];
  };

  Repository.prototype.parseData = function(data) {
    this.id = data.id || 0;
    this.name = data.name || '';
    this.fullName = data.full_name || '';
    this.description = data.description || '';
    this.language = data.language || '';
    this.url = data.url || '';
    this.owner = new app.models.user(data.owner);
    this.contributors = [];
  };

  Repository.prototype.setContributors = function(data) {

    this.contributors = _.map(data, function(contributor) {
      var user = new app.models.user();
      user.parseData(contributor);

      return user;
    });
  };

  app.models.repository = Repository;
})(app);
