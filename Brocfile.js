/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

//to use moment in code add below comment to header file
//http://www.ember-cli.com/#standard-non-amd-asset
// /* global moment */
//var day = moment('Dec 25, 1995');
app.import('bower_components/moment/moment.js');
app.import('bower_components/colorbrewer/colorbrewer.js');
app.import('bower_components/d3/d3.js');

app.import('bower_components/crossfilter/crossfilter.js');
app.import('bower_components/dc.js/dc.js');
app.import('bower_components/dc.js/dc.css');

app.import('bower_components/nvd3/build/nv.d3.js');
app.import('bower_components/nvd3/build/nv.d3.css');

app.import('bower_components/ember-nvd3/build/ember-nvd3.js');

app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', { destDir: 'assets' });

// import { raw as icAjaxRaw } from 'ic-ajax';
//icAjaxRaw( /* ... */ );
app.import('bower_components/ic-ajax/dist/named-amd/main.js', {
	exports: {
		'ic-ajax': [
			'default',
			'defineFixture',
			'lookupFixture',
			'raw',
			'request',
		]
	}
});

//continue here
//http://www.ember-cli.com/#generators-and-blueprints
module.exports = app.toTree();