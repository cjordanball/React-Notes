import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

// Use describe to group together tests
describe('App Component', () => {
	let component;
	beforeEach(() => {
		component = renderComponent(App);
	});

	it('shows the comment-box component', () => {
		expect(component.find('.comment-box')).to.exist;
	});

	it('shows a comment list', () => {
		expect(component.find('.comment-list')).to.exist;
	});
});
