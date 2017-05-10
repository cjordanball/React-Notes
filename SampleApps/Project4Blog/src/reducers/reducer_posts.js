import actionTypes from '../actions/types';

const ArrToObj = (arr, key) => {
	const newObj = {};
	arr.forEach((val) => {
		newObj[val[key]] = val;
	});
	return newObj;
};

const PostsReducer = (state = {}, action) => {
	switch (action.type) {
	case actionTypes.FETCH_POST:
		return { ...state, [action.payload.data.id]: action.payload.data };
	case actionTypes.FETCH_POSTS:
		return ArrToObj(action.payload.data, 'id');
	case actionTypes.DELETE_POST:
		delete state[action.payload];
		return { ...state };
	default:
		return state;
	}
};

export default PostsReducer;
