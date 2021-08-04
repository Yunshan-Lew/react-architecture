import fetch from 'isomorphic-fetch';
import browserHistory from '@/utils/browserHistory';
import cookies from 'browser-cookies';
import actions from '@/store/actions';
import configs from '@/config';
import toQueryString from '@/utils/toQueryString'

const SUCCESS = configs.status.success
const FAIL = configs.status.fail
const EXPIRES = configs.status.expires

function AjaxLogin(param){
	return function (dispatch, getState) {

		const { method, data, success, fail } = param

		return fetch(`${ configs.THE_HOST }/`, {
			method: method,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: toQueryString( Object.assign( {
				...configs.defaultParam
			}, data ) )
		})
		.then( res => res.json() )
		.then( res => {
			if( SUCCESS.indexOf(res.code) > -1 ){
				dispatch(actions['loginIn'](res.data))
				if( typeof success === 'function' ) {
					success(res)
				}
			}
			else if( FAIL.indexOf(res.code) > -1 && typeof fail === 'function' ){
				fail(res)
			}
			else if( EXPIRES.indexOf(res.code) > -1 ){
				// 登录过期 退出
				dispatch(actions['loginOut']())
				browserHistory.push({ pathname: '/login' })
			}
		} )
		.catch( error => {
			typeof fail === 'function' && fail({ msg: JSON.stringify(error, Object.getOwnPropertyNames(error)) })
		} )

	}
}

export default AjaxLogin
