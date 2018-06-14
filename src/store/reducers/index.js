import { combineReducers } from 'redux';
import loginTodo from './reducerLogin';
import relationTodo from './reducerRelation';

const todoApp = combineReducers({
	loginTodo,
	relationTodo
})

export default todoApp