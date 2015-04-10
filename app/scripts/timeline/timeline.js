var app = app || {};

(function(app, _) {
  var TIMELINE_ID = 0;

  app.timeline = function(data) {
    TIMELINE_ID ++;

    var timeline = {
      vm: {
        id: 'chart-' + TIMELINE_ID,
        chart: null,
        data: data
      },
      view: function() {
        var vm = timeline.vm;

        return m('div', {
          class: 'chart',
          id: vm.id,
          style: {
            width: '100%',
            height: '400px'
          },
          config: function(elm) {

            vm.chart = new Highcharts.Chart({
                chart: {
                    type: 'area',
                    renderTo: vm.id,
                    backgroundColor: 'transparent',
                    spacing: [0, 0, 0, 0]
                },

                colors: ['#2C3E50'],

                credits: {
                  enabled: false
                },

                title: {
                  text: null
                },

                legend: {
                    enabled: false
                },

                yAxis: {
                  title: {
                    text: null
                  },
                  labels: {
                    enabled: false
                  },
                  gridLineWidth: 0
                },

                xAxis: {
                  type: 'datetime',
                  labels: {
                    enabled: false
                  },
                  lineWidth: 0,
                  tickWidth: 0
                },

                tooltip: {
                  formatter: function() {
                    var date = new Date(this.x);
                    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + '<br/><strong>' + this.y + ' commits</strong>';
                  },
                  useHTML: true
                },

                series: [{
                    data: _.chain(vm.data).groupBy(function(val, key) {
                      return key.substring(0, 10);
                    }).map(function(values, date) {

                        return [Date.parse(date), _.reduce(values, function(sum, n) {
                          return sum + n;
                        })];
                      }).value()
                }]
            });
          }
        });

        // return m('canvas', {
        //     id: vm.id,
        //     width: 800,
        //     height: 400,
        //     config: function(elem) {
        //       var ctx = elem.getContext("2d"),
        //           transformedData = _.chain(vm.data).groupBy(function(val, key) {
        //             return key.substring(0, 10);
        //           }).map(function(values, date) {
        //             return {
        //               date: date,
        //               value: _.reduce(values, function(sum, n) {
        //                 return sum + n;
        //               })
        //             };
        //           }).value();
        //
        //       vm.chart = new Chart(ctx).Bar({
        //           labels: _.map(transformedData, function(data) {
        //             return data.date;
        //           }),
        //           datasets: [
        //               {
        //                   fillColor: '#2C3E50',
        //                   data: _.map(transformedData, function(data) {
        //                     return data.value;
        //                   })
        //               }
        //           ]
        //       }, {
        //         showScale: false,
        //         barShowStroke: false,
        //         barValueSpacing: 1,
        //         responsive: true,
        //         tooltipFillColor: '#E74C3C',
        //         tooltipFontSize: 18
        //       });
        //     }
        // });
      }
    };

    return timeline;
  };
})(app, _);
