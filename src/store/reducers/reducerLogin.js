const defaultStore = {
	userName: '',
	permission: [],
	token: '',
	logState: false
}

const todos = (state = defaultStore, { type, data }) => {
	switch (type) {
		case 'LOGIN_IN': 
			return {
				...state,
				logState: true,
				...data
			}
		case 'LOGIN_OUT':
			return {
				...state,
				logState: false
			}
		default:
			return state
	}
}

export default todos