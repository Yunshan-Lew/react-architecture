import cookies from 'browser-cookies';

const logRouteHook = (callbackState, replaceState, callback) => {
	let loginStatus = cookies.get('token') === 'true' ? true : false 
	
	// if(!loginStatus)replaceState('/common/login')
	
	callback()
}

export default logRouteHook