import React from 'react';
import jsdom from 'jsdom';
import _$ from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
<<<<<<< Updated upstream
import chai, { expect } from 'chai';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import chaiJquery from 'chai-jquery';
import reducers from '../src/reducers';
=======
import { expect } from 'chai';
>>>>>>> Stashed changes

// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = _$(global.window);

// build 'renderComponent' helper that should render a given react className
<<<<<<< Updated upstream
function renderComponent(ComponentClass, props = null, appState = {}) {
	const componentInstance = TestUtils.renderIntoDocument(
		<Provider store={createStore(reducers, appState)}>
			<ComponentClass {...props} />
		</Provider>
	);
=======
function renderComponent(ComponentClass) {
	const componentInstance = TestUtils.renderIntoDocument(<ComponentClass />);
>>>>>>> Stashed changes

	return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}
// build helper for simulating events
<<<<<<< Updated upstream
$.fn.simulate = function(eventName, value) {
	if (value) {
		// val is a jQuery method that assigns a value to an element
		this.val(value);
	}
	// 'this' will refer to the jQuery element
	TestUtils.Simulate[eventName](this[0]);
};

// set up chaiJquery
chaiJquery(chai, chai.util, $);
=======

// set up chaiJquery
>>>>>>> Stashed changes

export { renderComponent, expect };
