import Ember from 'ember';

export default Ember.Route.extend({
	setupController: function(controller, model) {
		this._super(controller, model);
		controller.set('model2', this.get('model2'));
		controller.set('customizeChart', this.get('customizeChart'));
	},

	customizeChart: function(chart) {
		//console.log(chart);
		chart.xAxis.tickFormat(function(d) {
			//console.log('tick', d);
			return d3.time.format('%b %d')(new Date(d));
		});
		return chart;
	},

	model: function() {

		function stream_index(d, i) {
			return {
				x: i,
				y: Math.max(0, d)
			};
		}

		function stream_layers(n, m, o) {
			if (arguments.length < 3) o = 0;

			function bump(a) {
				var x = 1 / (0.1 + Math.random()),
					y = 2 * Math.random() - 0.5,
					z = 10 / (0.1 + Math.random());
				for (var i = 0; i < m; i++) {
					var w = (i / m - y) * z;
					a[i] += x * Math.exp(-w * w);
				}
			}
			return d3.range(n).map(function() {
				var a = [],
					i;
				for (i = 0; i < m; i++) a[i] = o + o * Math.random();
				for (i = 0; i < 5; i++) bump(a);
				return a.map(stream_index);
			});
		}

		function testData() {
			return stream_layers(3, 128, 0.1).map(function(data, i) {
				return {
					key: 'Stream' + i,
					values: data
				};
			});
		}

		return testData();
	},

	model2: function() {
		var startDate = +(new Date());

		function days(num) {
			return num * 60 * 60 * 1000 * 24
		}

		function stream_index(d, i) {
			//console.log(d,i);
			//var j = new Date()+d;
			//return {x: i, y: j};
			var e = new Date(startDate + days(i));
			return {
				x: e,
				y: d
			};
		}

		function stream_layers(n, m, o) {
			if (arguments.length < 3) o = 0;

			function bump(a) {
				var x = 1 / (0.1 + Math.random()),
					y = 2 * Math.random() - 0.5,
					z = 10 / (0.1 + Math.random());
				for (var i = 0; i < m; i++) {
					var w = (i / m - y) * z;
					a[i] += x * Math.exp(-w * w);
				}
			}
			return d3.range(n).map(function() {
				var a = [],
					i;
				for (i = 0; i < m; i++) a[i] = o + o * Math.random();
				for (i = 0; i < 5; i++) bump(a);
				return a.map(stream_index);
			});
		}

		function testData() {
			return stream_layers(3, 128, 0.1).map(function(data, i) {
				return {
					key: 'Stream' + i,
					values: data
				};
			});
		}
		return testData();
	}
});