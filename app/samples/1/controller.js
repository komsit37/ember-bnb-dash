import Ember from 'ember';

export default Ember.Controller.extend({
	clength: Ember.computed('model.[]', function(){
		return this.get('model').get('length');
	}),

	actions: {
		add: function(x){
			this.get('model').pushObject({title: x});
		},
		remove: function(x){
			this.get('model').removeObject(x);
		},
		log: function(x){
			console.log(x);
		}
	}
});
