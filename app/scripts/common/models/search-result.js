var app = app || {};
app.models = app.models || {};

(function(app) {
  'use strict';

  var SearchResult = function(data) {
    this.id = data.id || 0;
    this.name = data.name || '';
    this.fullName = data.full_name || '';
    this.description = data.description || '';
    this.language = data.language || '';
    this.url = data.url || '';
    this.score = data.score || 0;
  };

  app.models.searchResult = SearchResult;
})(app);
