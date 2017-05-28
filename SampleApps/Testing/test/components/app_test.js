import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

describe('App', () => {
	let component;

	beforeEach(() => {
		component = renderComponent(App);
	});
	it('shows the comment-box component', () => {
		expect(component.find('.comment-box')).to.exist;
	});
	it('shows the comment-list component', () => {
		expect(component.find('.comment-list')).to.exist;
	});
});
