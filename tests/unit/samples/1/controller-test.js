import {
	moduleFor,
	test
}
from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:samples/1', {
	// Specify the other units that are required for this test.
	// needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
	var controller = this.subject();
	assert.ok(controller);
});

test('add action works', function(assert) {
	var controller = this.subject();
	controller.set('model', [{
		title: "Tomster"
	}, {
		title: "eiffel"
	}]);

	assert.equal(controller.get('model').get('length'), 2, 'model created');
	assert.equal(controller.get('clength'), 2, 'computed property on model is computed');


	controller.send('add', 'new object');
	assert.equal(controller.get('model').get('length'), 3, 'model added');

	//use deepEqual to assert object
	assert.deepEqual(controller.get('model').get(2), {
		title: 'new object'
	}, 'new object has correct object');
	assert.equal(controller.get('model').get(2).title, 'new object', 'new object has correct title field');
	assert.equal(controller.get('clength'), 3, 'clength is updated');

});