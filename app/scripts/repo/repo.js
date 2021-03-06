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
            that.repositoryTimeline = new app.chart(that.repository.getActivityChartData());
            that.repositoryContributorsImpact = new app.chart(that.repository.getActivityByContributorChartData());
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
          m('a.btn.btn-bookmark', {
            config: function(element) {
              element.title = 'Gitivity: ' + vm.repository.fullName;
              element.href = document.location.href;
              element.rel = 'sidebar';
            },
            onclick: function(event) {
              var bookmarkURL = this.href,
                  bookmarkTitle = this.title;

              if (window.external && 'AddFavorite' in window.external) {
            		window.external.AddFavorite(bookmarkURL, bookmarkTitle);
            	  return false;
              }
            	else if (window.sidebar && 'addPanel' in window.sidebar) {
            		window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
            	  return false;
              }
            	else if (window.opera || window.sidebar) {
                return true;
            	}
            	else {
            	   alert('Your browser doesn\'t support javascript boomarking.');
              }
            },
            rel: 'sidebar'
          }, [
            'Add to bookmark',
            m('span.icon.icon-bookmark')
          ])
        ]),
        m('section.activity', [
          m('h2', 'Global activity'),
          vm.repositoryTimeline.view()
        ]),
        m('section.activity.contributors-impact', [
          m('h2', 'Contributors impact'),
          vm.repositoryContributorsImpact.view()
        ]),
        m('section.contributors', [
          m('h2', 'Contributors'),
          m('div.container', [
            _.map(vm.repository.getActivityByContributor(), function(user) {
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
