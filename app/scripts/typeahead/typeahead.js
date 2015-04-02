var app = app || {};

(function(app, _) {
  'use strict';

  app.typeahead = function(opts) {
    var typeahead = {
      vm: {
        opts: _.assign({
          type: 'search'
        }, opts),
        term: m.prop('')
      },
      view: function(ctrl) {
        var vm = typeahead.vm,
            elms = _([]);

        if(vm.opts.label) {
          elms = elms.concat([
            m('div.form-input.typeahead', [
              m('input', _.assign(vm.opts, {
                value: vm.term(),
                oninput: m.withAttr('value', function(value) {
                  vm.term(value);

                  if(ctrl.onchange) {
                    ctrl.onchange(value);
                  }
                })
              })),
              vm.opts.label
            ])
          ]);
        }
        else {
          elms = elems.concat([
            m('input', _.assign(vm.opts, {
              class: 'typeahead',
              value: vm.term(),
              oninput: m.withAttr('value', function(value) {
                vm.term(value);

                if(ctrl.onchange) {
                  ctrl.onchange(value);
                }
              })
            }))
          ])
        }

        return elms.concat([
          m('ul.results', [
            ctrl.data().map(function(result) {
              return m('li.result', [
                m('span.name', result.fullName),
                m('span.desc', result.description),
                m('span.language', result.language)
              ]);
            })
          ])
        ]).value();
      }
    };

    return typeahead;
  };
})(app, _);
