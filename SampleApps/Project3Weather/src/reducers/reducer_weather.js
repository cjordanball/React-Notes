import ActionTypes from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
	console.log('howdy', action.payload ? action.payload.data: '');
	switch (action.type) {
	case ActionTypes.FETCH_WEATHER:
		return [...state, action.payload.data];
	default:
		return state;
	}
};
