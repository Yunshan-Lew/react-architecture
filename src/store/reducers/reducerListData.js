const defaultStore = {
	EMPLOYEE: {
		total: 0,
		list: [],
		current: 1
	},
	TRAIN: {
		total: 0,
		list: [],
		current: 1
	},
	BILLORDER: {
		total: 0,
		list: [],
		current: 1,
		order_nid: "",
		employee_name: ""
	}
}

const todos = (state = defaultStore, action) => {
	if( action.type === 'EMPLOYEE' ){
		const total = parseInt(action.data.total) || state['EMPLOYEE'].total
		const list = action.data.list || state['EMPLOYEE'].list
		const current = parseInt(action.data.current) || state['EMPLOYEE'].current
		return { ...state, EMPLOYEE: { total, list, current } }
	}
	else if( action.type === 'TRAIN' ){
		const total = parseInt(action.data.total) || state['TRAIN'].total
		const list = action.data.list || state['TRAIN'].list
		const current = parseInt(action.data.current) || state['TRAIN'].current
		return { ...state, TRAIN: { total, list, current } }
	}
	else if( action.type === 'BILLORDER' ){
		const total = parseInt(action.data.total) || state['BILLORDER'].total
		const list = action.data.list || state['BILLORDER'].list
		const current = parseInt(action.data.current) || state['BILLORDER'].current
		const employee_name = typeof action.data.employee_name === 'undefined' ? state['BILLORDER'].employee_name : action.data.employee_name 
		const order_nid = typeof action.data.order_nid === 'undefined' ? state['BILLORDER'].order_nid : action.data.order_nid
		return { ...state, BILLORDER: { total, list, current, order_nid, employee_name } }
	}
	else {
		return state
	}
}

export default todos