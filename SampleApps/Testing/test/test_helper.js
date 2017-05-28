import jsdom from 'jsdom';
import _$ from 'jquery';
// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = _$(global.window);

// build 'renderComponent' helper that should render a given react className

// buile helper for simulating events

// set up chaiJquery
