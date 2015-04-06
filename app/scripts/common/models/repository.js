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
    this.commits = [];
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

  Repository.prototype.setCommits = function(data) {
    this.commits = _.map(data, function(rawCommit) {
      var commit = new app.models.commit();
      commit.parseData(rawCommit);

      return commit;
    });
  };

  Repository.prototype.getActivity = function() {
    return _.countBy(this.commits, 'date');
  };

  Repository.prototype.getActivityByUser = function() {
    var that = this;

    return _.chain(that.contributors)
            .map(function(contributor) {
              return _.chain(contributor)
                      .clone()
                      .extend({
                        'activity':  _.chain(that.commits)
                                      .filter({author: contributor.login})
                                      .countBy('date')
                                      .value(),
                        'contributionsToActivity': _.chain(that.commits)
                                                    .filter({author: contributor.login})
                                                    .value()
                                                    .length
                      })
                      .value();
            })
            .sortByOrder('contributionsToActivity', false)
            .value();
  };

  app.models.repository = Repository;
})(app);
