var app = app || {};

(function(document, m, app) {
  'use strict';

  m.route.mode = 'hash';

  m.route(document.body, '/search', {
    '/search': app.search,
    '/repo/:owner/:repo': app.repo
  });
})(document, m, app);
