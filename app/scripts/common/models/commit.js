var app = app || {};
app.models = app.models || {};

(function(app) {
  'use strict';

  var Commit = function() {
  };

  Commit.prototype.parseData = function(data) {
    this.date = data.commit.committer.date || '';
    this.author = data.committer.login;
  };

  app.models.commit = Commit;
})(app);
