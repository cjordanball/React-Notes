import { ActionTypes } from './types';

export function selectBook(book) {
	return {
		type: ActionTypes.BOOK_SELECTED,
		payload: book,
	};
}
