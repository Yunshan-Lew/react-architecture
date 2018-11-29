import { combineReducers } from 'redux';
import loginInfo from './reducerLogin';
import relationTodo from './reducerRelation';
import ListData from './reducerListData'

const todoApp = combineReducers({
	loginInfo,
	relationTodo,
	ListData
})

export default todoApp