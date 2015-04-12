import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({
	priceChart: function(chart) {
		chart.xAxis.tickFormat(function(d) {
			return d3.time.format('%b %d')(new Date(d));
		});

		chart.x2Axis.tickFormat(function(d) {
			return d3.time.format('%b %d')(new Date());
		});
		return chart;
	},

	occChart: function(chart) {
		chart.xAxis.tickFormat(function(d) {
			return d3.time.format('%b %d')(new Date(d));
		});

		chart.x2Axis.tickFormat(function(d) {
			return d3.time.format('%b %d')(new Date());
		});

		chart.yAxis.tickFormat(d3.format(',.2f'));
		chart.y2Axis.tickFormat(d3.format(',.2f'));

		return chart;
	},

	onX: function(d, i) {
		return new Date(d.on);
	},
	priceY: function(d, i) {
		return d.avail_price;
	},
	occY: function(d, i) {
		return d.occupied;
	}
});