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
        this.results = m.prop([]);

        this.onchange = function(term) {
          if(term.length < 2) {
            that.results([]);
          }
          else if(term.length % 2 === 0) {
            app.services.github.search(term).then(that.results);
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
                data: vm.results,
                onchange: vm.onchange
              })
            ])
          ])
        ]);
    }
  };
})(app, _);
