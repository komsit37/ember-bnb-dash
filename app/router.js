import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('samples', function() {
    this.route('1');
    this.route('2');
    this.route('3');
    this.route('dc');
    this.route('dc-ajax');
  });
  this.resource('pricing', function() {});
});
