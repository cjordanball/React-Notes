import { combineReducers } from 'redux';
import AuthReducer from './reducerAuth';

const rootReducer = combineReducers({
	authenticated: AuthReducer
});

export default rootReducer;
