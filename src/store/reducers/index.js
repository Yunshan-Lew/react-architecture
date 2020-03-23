import { combineReducers } from 'redux';
import loginInfo from './reducerLogin';
import detailData from './reducerDetail';
import ListData from './reducerListData'

const todoApp = combineReducers({
	loginInfo,
	detailData,
	ListData
})

export default todoApp
