import Actions from './types';

export function Authenticate(isLoggedIn) {
	return {
		type: Actions.CHANGE_AUTH,
		payload: isLoggedIn
	}
}

export function DisAuthenticate() {
	return {
		type: Actions.MESS_UP,
		payload: 'Bazoom'
	}
}
