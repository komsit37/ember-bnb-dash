import Ember from 'ember';
/* global d3 */

export default Ember.Controller.extend({
	actions: {
		selectedDate: function(e) {
			var room = e.series.key;
			var date = d3.time.format('%b %d')(new Date(e.point.x));
			var price = e.point.y;
			var status = e.point.status;
			this.set('selected', {
				'room': room,
				'date': date,
				'price': price,
				'status': status
			});

			console.log("You've clicked on " + room + " - " + date + " - " + price + " - " + status);
		}
	}
});