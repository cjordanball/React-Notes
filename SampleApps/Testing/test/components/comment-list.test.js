import { renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';

describe('CommentList', () => {
	let component;

	beforeEach(() => {
		component = renderComponent(
			CommentList,
			null,
			{
				comments: ['Test Comment 1', 'Test Comment 2'],
			},
		);
	});

	it('shows an LI for each comment', () => {
		expect(component.find('li').length).to.equal(2);
	});
	it('shows each comment that is provided', () => {
		const comments = component.find('li');
		expect(comments[0].textContent).to.equal('Test Comment 1');
		expect(comments[1].textContent).to.equal('Test Comment 2');
	});
});
