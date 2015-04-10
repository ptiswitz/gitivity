var app = app || {};

(function(app, _) {
  var CHART_ID = 0;

  app.chart = function(options) {
    CHART_ID ++;

    var chartId = 'chart-' + CHART_ID,
        chart = {
      vm: {
        id: chartId,
        charts: null,
        options: _.merge({
          chart: {
            renderTo: chartId,
            backgroundColor: 'transparent',
            spacing: [0, 0, 0, 0]
          },

          credits: {
            enabled: false
          },

          title: {
            text: null
          }
        }, options)
      },
      view: function() {
        var vm = chart.vm;

        return m('div', {
          class: 'chart',
          id: vm.id,
          config: function(elm) {
            vm.chart = new Highcharts.Chart(vm.options);
          }
        });
      }
    };

    return chart;
  };
})(app, _);
