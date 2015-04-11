import Ember from 'ember';

export default Ember.Route.extend({
	init: function() {
		this.set('x', 1);
		// console.log(this.get('x'));
	},
	
	setupController: function(controller, model) {
		this._super(controller, model);
		controller.set('data', {id: 123, name: 'gab'});
		controller.set('x', this.get('x'));	//set property
		controller.set('y', this.get('y'));	//computed property
	},

	y: Ember.computed('x', function(){
		return this.get('x') + 2;
	}),

	incX: function() {
		this.set('x', this.get('x') + 1);
	},

	model: function() {
		return [{
			title: "Tomster"
		}, {
			title: "eiffel"
		}];
	}
});