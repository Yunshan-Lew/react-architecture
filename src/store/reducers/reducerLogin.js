const loginInfo = {
	token: '',
	logState: false
}

const todos = (state = loginInfo, { type, token }) => {
	switch (type) {
		case 'LOGIN_OUT':
			return {
				...state,
				logState: false
			}
		case 'LOGIN_IN': 
			return {
				...state,
				logState: true
			}
		case 'PULL_TOKEN':
			return {
				...state,
				token: token
			}
		case 'PUSH_TOKEN':
			return {
				...state,
				token: token
			}
		default:
			return state
	}
}

export default todos