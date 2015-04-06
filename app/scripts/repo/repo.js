var app = app || {};

(function(app) {
  'use strict';

  app.repo = {
    controller: function() {
      app.repo.vm.init();
    },
    vm: {
      init: function() {
        var that = this,
            ownerParam = m.route.param('owner') || '',
            repoParam = m.route.param('repo') || '';

        this.repository = new app.models.repository();

        if(_.isEmpty(ownerParam) || _.isEmpty(repoParam)) {
          m.route('/search');
        }
        else {
          app.services.github.get(ownerParam, repoParam).then(function(repository) {
            if(repository.id === 0) {
              m.route('/search');
            }

            that.repository = repository;
          });
        }

        app.search.controller();
      }
    },
    view: function() {
      var vm = app.repo.vm;

      return [
        app.search.view({
          class: 'small'
        }),
        m('section.infos', [
          m('h2', vm.repository.fullName),
          m('h3', vm.repository.description),
          m('a.btn.btn-bookmark', 'Add to bookmark')
        ]),
        m('section.contributors', [
          m('h2', 'Contributeurs'),
          m('div.container', [
            _.map(vm.repository.getActivityByUser(), function(user) {
              return m('figure', [
                m('img', {
                  src: user.avatar
                }),
                m('figcaption', user.login)
              ]);
            })
          ])
        ])
      ];
    }
  };
})(app);
