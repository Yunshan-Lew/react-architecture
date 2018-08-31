import cookies from 'browser-cookies';

const outRouteHook = (callbackState, replaceState, callback) => {
	let loginStatus = cookies.get('logState') === 'true' ? true : false
	
	if(loginStatus)replaceState('/employee/list')
	
	callback()
}

export default outRouteHook