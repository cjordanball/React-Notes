export default function({ dispatch }) {
	return next => action => {
		if (action.payload.then){
			action.payload.then(data => {
				let newAction = {
					type: action.type,
					payload: data
				}
				return dispatch(newAction);
			})
		}
		next(action);
	}
}
