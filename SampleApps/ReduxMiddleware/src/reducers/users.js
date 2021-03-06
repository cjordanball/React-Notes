import { FETCH_USERS } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_USERS:
			return action.payload.data ? [ ...state, ...action.payload.data] : [];
	}
	return state;
}
