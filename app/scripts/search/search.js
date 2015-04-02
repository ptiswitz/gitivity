var app = app || {};

(function(app, _) {
  'use strict';

  app.search = {
    controller: function() {
      app.search.vm.init();
    },
    vm: {
      init: function() {
        var that = this;

        this.repositoryTypeahead = new app.typeahead({
          name: 'repository',
          id: 'repository',
          placeholder: 'eg. \'angular\' or \'TryGhost/Ghost\'',
          label: m('label', {
            for: 'repository'
          }, [
            m('span.icon-search')
          ])
        });
        this.selectedRepository = m.prop('');
        this.repositories = m.prop([]);

        this.searchRepositories = function(term) {
            if(term.length < 2) {
              that.repositories([]);
            }
            else if(term.length % 2 === 0) {
              m.request({
                method: 'GET',
                url: 'https://api.github.com/search/repositories?q=' + term
              }).then(function(data) {
                var repositories = _.sortByOrder(_.map(data.items, function(item) {
                  return new app.Repository(item);
                }), 'score', false);

                return repositories;
              }).then(that.repositories);
            }
        };
      }
    },
    view: function() {
        var vm = app.search.vm;

        return m('header', [
          m('div', {
            class: 'container'
          }, [
            m('h1', [
              m('span', {
                class: 'icon-github'
              })
            ]),
            m('form', {
              class: 'search-form'
            }, [
              vm.repositoryTypeahead.view({
                data: vm.repositories,
                onchange: vm.searchRepositories
              })
            ])
          ])
        ]);
    }
  };
})(app, _);
