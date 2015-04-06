var app = app || {};
app.models = app.models || {};

(function(app) {
  'use strict';

  var User = function() {
    this.id = 0;
    this.login = '';
    this.avatar = '';
    this.url = '';
    this.contributions = 0;
  };

  User.prototype.parseData = function(data) {
    this.id = data.id || 0;
    this.login = data.login || '';
    this.avatar = data.avatar_url || '';
    this.url = data.url || '';
    this.contributions = data.contributions || 0;
  };

  app.models.user = User;
})(app);
