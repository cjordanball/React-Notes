import { expect } from '../test_helper';
import commentReducer from '../../src/reducers/comments';
import actions from '../../src/actions/types';

describe('Comments Reducer', () => {
	it('handles action with unknown type', () => {
		const output = commentReducer(['old comment'], { type: 'Bazoom', payload: 'this is fake data' });
		expect(output).to.eql(['old comment']);
	});

	it('handles action of type SAVE_COMMENT', () => {
		const action = { type: actions.SAVE_COMMENT, payload: 'new comment' };
		const output = commentReducer([], action);
		expect(output).to.eql(['new comment']);
	});
});
