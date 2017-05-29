import Actions from '../actions/types';

const AuthReducer = (state = false, action) => {
	switch (action.type) {
		case Actions.CHANGE_AUTH:
			return action.payload;
		case Actions.MESS_UP:
			return action.payload;
		default:
			return state;
	}
}

export default AuthReducer
