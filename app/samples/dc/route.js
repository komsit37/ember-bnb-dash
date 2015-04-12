import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		return [{
			Name: 'Mr A',
			Spent: '$40',
			Year: 2011
		}, {
			Name: 'Mr B',
			Spent: '$10',
			Year: 2011
		}, {
			Name: 'Mr C',
			Spent: '$40',
			Year: 2011
		}, {
			Name: 'Mr A',
			Spent: '$70',
			Year: 2012
		}, {
			Name: 'Mr B',
			Spent: '$20',
			Year: 2012
		}, {
			Name: 'Mr B',
			Spent: '$50',
			Year: 2013
		}, {
			Name: 'Mr C',
			Spent: '$30',
			Year: 2013
		}];
	}
});