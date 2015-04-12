import Ember from 'ember';


export default Ember.Controller.extend({
	ready: function() {
		console.log('controller init');
		console.log(this.get('controller.model'));
	}
});