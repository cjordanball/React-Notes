import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

// Use describe to group together tests
describe('App Component', () => {
	// use it to test a single attribute
	it('shows the correct text', () => {
		// create an instance of App
		const component = renderComponent(App);
		// use expect to make an assertion about the target
		expect(component).to.contain('React simple starter');
	});
});
