import Ember from 'ember';
/* global dc */
/* global crossfilter */
/* global d3 */

export default Ember.View.extend({
	didInsertElement: function() {
		console.log('view.init');
		var rooms = this.get('controller.model');

		var yearRingChart = dc.pieChart("#chart-ring-year"),
			occHistChart = dc.barChart("#chart-hist-spend"),
			spenderRowChart = dc.rowChart("#chart-row-spenders");

		// set crossfilter
		var ndx = crossfilter(rooms),
			regionDim = ndx.dimension(function(d) {
				return d.region;
			}),
			occDim = ndx.dimension(function(d) {
				return Math.floor(d.occupancy * 10);
			}),
			countryDim = ndx.dimension(function(d) {
				return d.country;
			}),
			occPerCity = regionDim.group().reduceSum(function(d) {
				// return +d.occupancy;
				return +1;
			}),
			occPerCountry = countryDim.group().reduceSum(function(d) {
				return +d.occupancy;
			}),
			occHist = occDim.group().reduceCount();

		yearRingChart
			.width(200).height(200)
			.dimension(regionDim)
			.group(occPerCity)
			.innerRadius(50);

		occHistChart
			.width(300).height(200)
			.dimension(occDim)
			.group(occHist)
			.x(d3.scale.linear().domain([0, 10]))
			.elasticY(true);

		occHistChart.xAxis().tickFormat(function(d) {
			return d / 10;
		}); // convert back to base unit
		occHistChart.yAxis().ticks(2);

		spenderRowChart
			.width(350).height(200)
			.dimension(countryDim)
			.group(occPerCountry)
			.elasticX(true);

		dc.renderAll();
	}

});