import actions from './types';

export const saveComment = (comment) => {
	return {
		type: actions.SAVE_COMMENT,
		payload: comment,
	};
};
