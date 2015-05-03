import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Route.extend({
	model: function(){
		var promises = {
			dat: ajax('dat'),
			dat2: ajax('dat2')
		};
		return Ember.RSVP.hash(promises);	//return Hash of promises https://github.com/tildeio/rsvp.js#hash-of-promises
	}
});
