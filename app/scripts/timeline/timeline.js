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

        return m('canvas', {
            id: vm.id,
            width: 800,
            height: 400,
            config: function(elem) {
              var ctx = elem.getContext("2d"),
                  transformedData = _.chain(vm.data).groupBy(function(val, key) {
                    return key.substring(0, 10);
                  }).map(function(values, date) {
                    return {
                      date: date,
                      value: _.reduce(values, function(sum, n) {
                        return sum + n;
                      })
                    };
                  }).value();

              vm.chart = new Chart(ctx).Line({
                  labels: _.map(transformedData, function(data) {
                    return data.date;
                  }),
                  datasets: [
                      {
                          fillColor: "rgba(220,220,220,0.2)",
                          strokeColor: "rgba(220,220,220,1)",
                          pointColor: "rgba(220,220,220,1)",
                          pointStrokeColor: "#fff",
                          pointHighlightFill: "#fff",
                          pointHighlightStroke: "rgba(220,220,220,1)",
                          data: _.map(transformedData, function(data) {
                            return data.value;
                          })
                      }
                  ]
              });
            }
        });
      }
    };

    return timeline;
  };
})(app, _);
