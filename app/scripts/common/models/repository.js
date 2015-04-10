var app = app || {};
app.models = app.models || {};

(function(app) {
  'use strict';

  var Repository = function() {
    this.id = 0;
    this.name = '';
    this.fullName = '';
    this.description = '';
    this.language = '';
    this.url = '';
    this.owner = new app.models.user();
    this.contributors = [];
    this.commits = [];
  };

  Repository.prototype.parseData = function(data) {
    this.id = data.id || 0;
    this.name = data.name || '';
    this.fullName = data.full_name || '';
    this.description = data.description || '';
    this.language = data.language || '';
    this.url = data.url || '';
    this.owner = new app.models.user(data.owner);
    this.contributors = [];
  };

  Repository.prototype.setContributors = function(data) {
    this.contributors = _.map(data, function(contributor) {
      var user = new app.models.user();
      user.parseData(contributor);

      return user;
    });
  };

  Repository.prototype.setCommits = function(data) {
    this.commits = _.map(data, function(rawCommit) {
      var commit = new app.models.commit();
      commit.parseData(rawCommit);

      return commit;
    });
  };

  Repository.prototype.getActivity = function() {
    return _.countBy(this.commits, 'date');
  };

  Repository.prototype.getActivityByContributor = function() {
    var that = this;

    return _.chain(that.contributors)
            .map(function(contributor) {
              return _.chain(contributor)
                      .clone()
                      .extend({
                        'activity':  _.chain(that.commits)
                                      .filter({author: contributor.login})
                                      .countBy('date')
                                      .value(),
                        'contributionsToActivity': _.chain(that.commits)
                                                    .filter({author: contributor.login})
                                                    .value()
                                                    .length
                      })
                      .value();
            })
            .sortByOrder('contributionsToActivity', false)
            .value();
  };

  Repository.prototype.getActivityChartData = function() {
    var data = this.getActivity();

    return {
        chart: {
            type: 'area',
        },

        colors: ['#2C3E50'],

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
            data: _.chain(data).groupBy(function(val, key) {
              return key.substring(0, 10);
            }).map(function(values, date) {

                return [Date.parse(date), _.reduce(values, function(sum, n) {
                  return sum + n;
                })];
              }).value()
        }]
    };
  };

  Repository.prototype.getActivityByContributorChartData = function() {
    var data = this.getActivityByContributor();

    return {
        chart: {
          type: 'treemap'
        },

        colorAxis: {
          minColor: '#ECF0F1',
          maxColor: '#34495E'
        },

        legend: {
            enabled: false
        },

        plotOptions: {
          treemap: {
            borderWidth: 0,
            dataLabels: {
              style: {
                textShadow: 'none'
              }
            }
          }
        },

        tooltip: {
          pointFormat: '<strong>{point.value} commits</strong>',
          useHTML: true
        },

        series: [{
          data: _.chain(data).filter(function(contributor) {
            return contributor.contributionsToActivity > 0;
          }).map(function(contributor) {
            return {
              name: contributor.login,
              value: contributor.contributionsToActivity,
              colorValue: contributor.contributionsToActivity
            };
          }).value()
        }]
    };
  };

  app.models.repository = Repository;
})(app);
