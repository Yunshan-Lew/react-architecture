const loginInfo = {
	token: '',
	logState: false
}

const todos = (state = loginInfo, { type, token }) => {
	switch (type) {
		case 'LOGIN_IN': 
			return {
				...state,
				logState: true,
				token: token
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