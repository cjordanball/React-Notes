import { ActionTypes } from '../actions/types';

const INITIAL_STATE = {
	title: '',
	pages: null
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ActionTypes.BOOK_SELECTED:
			return { ...state, title: action.payload.title, pages: action.payload.pages };
		default:
			return state;
	}
};
