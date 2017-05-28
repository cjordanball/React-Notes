import { combineReducers } from 'redux';
import CommentsReducer from './comments';

const rootReducer = combineReducers({
	comments: CommentsReducer,
});

export default rootReducer;
