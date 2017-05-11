import { expect } from '../test_helper';
import commentReducer from '../../src/reducers/comments';
import { SAVE_COMMENT } from '../../src/actions/types';

describe('Comments Reducer', () => {
	it('handles action with unknown type', () => {
		let output = commentReducer(['old comment'], {type: 'Bazoom', payload: 'this is fake data'});
		expect(output).to.eql(['old comment']);
	});

	it('handles action of type SAVE_COMMENT', () => {
		const action = { type: SAVE_COMMENT, payload: 'new comment' };
		let output = commentReducer([], action);
		expect(output).to.eql(['new comment']);
	});
})
