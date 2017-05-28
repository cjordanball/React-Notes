import { expect } from '../test_helper';
import actions from '../../src/actions/types';
import { saveComment } from '../../src/actions';

describe('actions', () => {
	describe('saveComment', () => {
		it('has the correct type', () => {
			const action = saveComment();
			expect(action.type).to.equal(actions.SAVE_COMMENT)
		});

		it('has the correct payload', () => {
			const action = saveComment('new comment');
			expect(action.payload).to.equal('new comment');
		});
	});
});
