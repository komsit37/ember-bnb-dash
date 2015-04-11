import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:sample', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  var route = this.subject();
  assert.ok(route);
});

test('test sample properties', function(assert){
	var route = this.subject();

	assert.equal(route.get('x'), 1, 'x is 1');
	assert.equal(route.get('y'), 3, 'y is x + 2 = 3');
	route.set('x', 3);
	assert.equal(route.get('x'), 3, 'x is 3');
	assert.equal(route.get('y'), 5, 'y is x + 2 = 5');
	route.incX();
	assert.equal(route.get('x'), 4, 'incX works');
	assert.equal(route.get('y'), 6, 'y is recomputed after incX call');
});
