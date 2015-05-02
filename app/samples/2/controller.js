import Ember from 'ember';
/* global d3 */

export default Ember.Controller.extend({
	priceChart: function(chart) {
		chart.xAxis.tickFormat(function(d) {
			return d3.time.format('%b %d')(new Date(d));
		});

		chart.x2Axis.tickFormat(function(d) {
			return d3.time.format('%b %d')(new Date(d));
		});
		return chart;
	},

	occChart: function(chart) {
		chart.xAxis.tickFormat(function(d) {
			return d3.time.format('%b %d')(new Date(d));
		});

		chart.x2Axis.tickFormat(function(d) {
			return d3.time.format('%b %d')(new Date(d));
		});

		chart.yAxis.tickFormat(d3.format(',.2f'));
		chart.y2Axis.tickFormat(d3.format(',.2f'));

		return chart;
	},

	xdate: function(d) {
		return new Date(d.x);
	},
	y: function(d) {
		return d.y;
	},

	onX: function(d) {
		return new Date(d.on);
	},
	priceY: function(d) {
		return d.avail_price;
	},
	occY: function(d) {
		return d.occupied;
	}
});