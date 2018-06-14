import cookies from 'browser-cookies'

const loginIn = () => {
	cookies.set('logState', 'true', {
		expires: 7,
		path: '/'
	})
	return {
		type: 'LOGIN_IN'
	}
}

const loginOut = () => {
	cookies.set('logState', 'false', {
		expires: 7,
		path: '/'
	})
	return {
		type: 'LOGIN_OUT'
	}
}

const pullToken = () => {
	let token = cookies.get('token')
	return {
		type: 'PULL_TOKEN',
		token
	}
}

const pushToken = (str) => {
	cookies.set('token', str, {
		expires: 7,
		path: '/'
	})
	return {
		type: 'PUSH_TOKEN',
		token: str
	}
}

export { loginIn, loginOut, pullToken, pushToken }