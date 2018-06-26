import { combineReducers } from 'redux';
import loginTodo from './reducerLogin';
import relationTodo from './reducerRelation';
import ListData from './reducerListData'

const todoApp = combineReducers({
	loginTodo,
	relationTodo,
	ListData
})

export default todoApp