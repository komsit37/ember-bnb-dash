import Ember from 'ember';
/* global dc */
/* global crossfilter */
/* global d3 */

export default Ember.View.extend({
	didInsertElement: function() {
		console.log('view.init');
		var spendData = this.get('controller.model');

		var yearRingChart = dc.pieChart("#chart-ring-year"),
			spendHistChart = dc.barChart("#chart-hist-spend"),
			spenderRowChart = dc.rowChart("#chart-row-spenders");

		// normalize/parse data
		spendData.forEach(function(d) {
			d.Spent = d.Spent.match(/\d+/);
		});

		// set crossfilter
		var ndx = crossfilter(spendData),
			yearDim = ndx.dimension(function(d) {
				return +d.Year;
			}),
			spendDim = ndx.dimension(function(d) {
				return Math.floor(d.Spent / 10);
			}),
			nameDim = ndx.dimension(function(d) {
				return d.Name;
			}),
			spendPerYear = yearDim.group().reduceSum(function(d) {
				return +d.Spent;
			}),
			spendPerName = nameDim.group().reduceSum(function(d) {
				return +d.Spent;
			}),
			spendHist = spendDim.group().reduceCount();

		yearRingChart
			.width(200).height(200)
			.dimension(yearDim)
			.group(spendPerYear)
			.innerRadius(50);

		spendHistChart
			.width(300).height(200)
			.dimension(spendDim)
			.group(spendHist)
			.x(d3.scale.linear().domain([0, 10]))
			.elasticY(true);

		spendHistChart.xAxis().tickFormat(function(d) {
			return d * 10;
		}); // convert back to base unit
		spendHistChart.yAxis().ticks(2);

		spenderRowChart
			.width(350).height(200)
			.dimension(nameDim)
			.group(spendPerName)
			.elasticX(true);

		dc.renderAll();
	}

});