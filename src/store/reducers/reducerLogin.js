const loginInfo = {
	token: '',
	logState: false
}

const todos = (state = loginInfo, action) => {
	switch (action.type) {
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
				token: action.token
			}
		case 'PUSH_TOKEN':
			return {
				...state,
				token: action.token
			}
		default:
			return state
	}
}

export default todos