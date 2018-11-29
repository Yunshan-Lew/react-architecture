import cookies from 'browser-cookies'

const loginIn = (data) => {
	const { token } = data
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
		data
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

const reLogin = (data) => {
	cookies.set('logState', 'true', {
		expires: 7,
		path: '/'
	})
	return {
		type: 'RE_LOGIN',
		data
	}
}

export { loginIn, loginOut, reLogin }