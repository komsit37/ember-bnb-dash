import Ember from 'ember';
/* global d3, nv */

export default Ember.Component.extend({
	tagName: 'svg',
	data: null,

	didInsertElement: function() {
		this.updateChart();
	},

	updateChart: function() {
		var self = this;

		// register our custom symbols to nvd3
		// make sure your path is valid given any size because size scales if the chart scales.
		nv.utils.symbolMap.set('thin-x', function(size) {
			size = Math.sqrt(size);
			return 'M' + (-size / 2) + ',' + (-size / 2) +
				'l' + size + ',' + size +
				'm0,' + -(size) +
				'l' + (-size) + ',' + size;
		});

		// create the chart
		var chart;
		nv.addGraph(function() {
			chart = nv.models.scatterChart()
				.useVoronoi(true)
				.color(d3.scale.category10().range())
				.duration(300);

			chart.pointRange([100, 200]);	//size scale
			chart.tooltip.fixedTop(10);		//not good, but temporary
			//chart.tooltip.position({left: 500, top: 100});
			//chart.tooltip.enabled(false);

			chart.margin({
				top: 5,
				right: 40,
				bottom: 20,
				left: 120
			});

			chart.x(function(d) {
				return new Date(d.x);
			});

			chart.xAxis.tickFormat(function(d) {
				return d3.time.format('%b %d')(new Date(d));
			});

			chart.scatter.dispatch.on('elementClick', function(e) {
				//alert("You've clicked on " + e.series.key + " - " + d3.time.format('%b %d')(new Date(e.point.x)) + " - " + e.point.size + " - " + e.point.y);
				self.sendAction('selectedDate', e);
			});

			// chart.scatter.dispatch.on('elementMouseover', function(e) {
			// 	e.point.size = 10;
			// 	console.log("mouseover on " + e.series.key + " - " + d3.time.format('%b %d')(new Date(e.point.x)));
			// });

			// chart.scatter.dispatch.on('elementMouseout', function(e) {
			// 	console.log("mouseout on " + e.series.key + " - " + d3.time.format('%b %d')(new Date(e.point.x)));
			// });

			chart.scatter._calls = new function() {
				this.clearHighlights = function() {
					nv.dom.write(function() {
						console.log('clear');
						d3.selectAll(".nv-chart-" + chart.scatter.id() + " .nv-point.hovergroup").classed("hover", false);
					});
					return null;
				};
				this.highlightPoint = function(seriesIndex, pointIndex, isHoverOver) {
					nv.dom.write(function() {
						//console.log(seriesIndex + ',' + pointIndex + ',' + isHoverOver);
						//console.log('override');
						//console.log(chart.scatter.id());
						//var node = document.querySelector(".nv-chart-" + chart.scatter.id() + " .nv-series-" + seriesIndex + " .nv-point-" + pointIndex);
						var node = document.querySelectorAll(".nv-chart-" + chart.scatter.id() + " .nv-series-" + seriesIndex + " .nv-point");
						//console.log(node);
						//d3.select(node).classed("hover", isHoverOver);
						d3.selectAll(node).classed("hovergroup", isHoverOver);
					});
				};
			};

			d3.select(self.get('element'))
				.datum(self.get('data'))
				.call(chart);

			nv.utils.windowResize(chart.update);

			return chart;
		});

	}
});