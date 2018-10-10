import cookies from 'browser-cookies'

const loginIn = (res) => {
	const { token } = res
	cookies.set('logState', 'true', {
		expires: 7,
		path: '/'
	})
	cookies.set('token', token, {
		expires: 7,
		path: '/'
	})
	return {
		type: 'LOGIN_IN',
		token: token
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

export { loginIn, loginOut }