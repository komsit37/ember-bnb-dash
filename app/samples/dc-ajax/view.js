import Ember from 'ember';
/* global dc */
/* global crossfilter */
/* global d3 */

export default Ember.View.extend({
	actions: {
		resetFilter: function(){
			console.log('reset');
			dc.filterAll(); 
			dc.renderAll();
		}
	},
	click: function(e){
		console.log(e.target);
	},
	didInsertElement: function() {
		console.log('view.init');
		var rooms = this.get('controller.model');

		// var yearRingChart = dc.pieChart("#chart-ring-year"),
		var cityChart = dc.rowChart("#left-chart"),
			occHistChart = dc.barChart("#mid-chart"),
			regionChart = dc.rowChart("#right-chart"),
			dataTable = dc.dataTable("#data-table-spenders");

		// set crossfilter
		var ndx = crossfilter(rooms),
			titleDim = ndx.dimension(function(d) {
				return d.title;
			}),
			cityDim = ndx.dimension(function(d) {
				return d.city;
			}),
			occDim = ndx.dimension(function(d) {
				return Math.floor(d.occupancy * 10);
			}),
			regionDim = ndx.dimension(function(d) {
				return d.region;
			}),
			// occPerCity = cityDim.group().reduceSum(function(d) {
			// 	// return +d.occupancy;
			// 	return +1;
			// }),
			occPerCity = cityDim.group().reduceCount(),
			occPerRegion = regionDim.group().reduceSum(function(d) {
				return +d.occupancy;
			}),
			occHist = occDim.group().reduceCount();

		// yearRingChart
		// 	.width(200).height(200)
		// 	.dimension(cityDim)
		// 	.group(occPerCity)
		// 	.innerRadius(50);

		cityChart
			.width(350).height(500)
			.dimension(cityDim)
			.group(occPerCity)
			.elasticX(false)
			//.gap(2)
			.labelOffsetY(6)
			.on('filtered', function(chart, filter){
				console.log(filter);
			})
			// .colors(colorbrewer.RdYlGn[9]) // (optional) define color function or array for bubbles
			.colors(d3.scale.category20b()); // (optional) define color function or array for bubbles
			// .colors(d3.range(["#4575b4", "#ffffbf", "#a50026"]))
			//      .colorDomain([-500, 500]);

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

		regionChart
			.width(350).height(200)
			.dimension(regionDim)
			.group(occPerRegion)
			.elasticX(false);

		dataTable
			.dimension(titleDim)
			.group(function(d) {
				return d.title;
			})
			.columns([function(d) {
				return d.title;
			}, function(d) {
				return d.city;
			}])
			.renderlet(function(table) {
				table.selectAll('.dc-table-group').classed('info', true);
			});


		dc.renderAll();
	}

});