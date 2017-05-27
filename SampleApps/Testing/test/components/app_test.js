import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

describe('App', () => {
	it('shows the correct text', () => {
		// first, create an instance of App
		const component = renderComponent(App);
		expect(component).contain('React simple starter');
	});
});
