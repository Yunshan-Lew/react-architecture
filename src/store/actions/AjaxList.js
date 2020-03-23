import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import cookies from 'browser-cookies';
import actions from '@/store/actions';
import configs from '@/config';
import toQueryString from '@/utils/toQueryString'

const SUCCESS = configs.status.success
const FAIL = configs.status.fail
const EXPIRES = configs.status.expires

function AjaxList(param){
	return function (dispatch, getState) {

		const { url, method, data, sign, success, fail } = param

		return fetch(url, {
			method: method,
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: toQueryString( Object.assign( {
				"token": getState().loginInfo.token || cookies.get('token') || "",
				...configs.defaultParam,
				"current_page": getState().ListData[sign].current,
				"page_size": configs.pageSize
			}, data ) )
		})
		.then( res => res.json() )
		.then( res => {
			if( SUCCESS.indexOf(res.code) > -1 ){
				if( sign && typeof sign === 'string' ) dispatch(actions['pushListData'](sign, { ...res.data, ...data }))
				if( typeof success === 'function' ) success(res)
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

export default AjaxList
