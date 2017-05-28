import actions from '../actions/types';

const CommentsReducer = (state = [], action) => {
	switch (action.type) {
	case actions.SAVE_COMMENT:
		return [...state, action.payload];
	default:
		return state;
	}
};

export default CommentsReducer;
