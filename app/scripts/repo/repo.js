var app = app || {};

(function(app) {
  'use strict';

  app.repo = {
    controller: function() {
      app.repo.vm.init();
    },
    vm: {
      init: function() {
        app.search.controller();
      }
    },
    view: function() {
      return [
        app.search.view({
          class: 'small'
        }),
        m('section.contributors', [
          m('h2', 'Contributeurs'),
          m('figure', [
            m('img', {
              src: 'http://tympanus.net/Tutorials/CircleHoverEffects/images/6.jpg'
            }),
            m('figcaption', 'Cylon')
          ]),
          m('figure', [
            m('img', {
              src: 'http://tympanus.net/Tutorials/CircleHoverEffects/images/6.jpg'
            }),
            m('figcaption', 'Cylon')
          ]),
          m('figure', [
            m('img', {
              src: 'http://tympanus.net/Tutorials/CircleHoverEffects/images/6.jpg'
            }),
            m('figcaption', 'Cylon')
          ]),
          m('figure', [
            m('img', {
              src: 'http://tympanus.net/Tutorials/CircleHoverEffects/images/6.jpg'
            }),
            m('figcaption', 'Cylon')
          ]),
          m('figure', [
            m('img', {
              src: 'http://tympanus.net/Tutorials/CircleHoverEffects/images/6.jpg'
            }),
            m('figcaption', 'Cylon')
          ]),
          m('figure', [
            m('img', {
              src: 'http://tympanus.net/Tutorials/CircleHoverEffects/images/6.jpg'
            }),
            m('figcaption', 'Cylon')
          ]),
          m('figure', [
            m('img', {
              src: 'http://tympanus.net/Tutorials/CircleHoverEffects/images/6.jpg'
            }),
            m('figcaption', 'Cylon')
          ])
        ])
      ];
    }
  };
})(app);
