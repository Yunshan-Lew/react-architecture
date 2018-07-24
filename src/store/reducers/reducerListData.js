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

const todos = (state = defaultStore, { type, data }) => {
	if( type === 'EMPLOYEE' ){
		const total = parseInt(data.total) || state['EMPLOYEE'].total
		const list = data.list || state['EMPLOYEE'].list
		const current = parseInt(data.current) || state['EMPLOYEE'].current
		return { ...state, EMPLOYEE: { total, list, current } }
	}
	else if( type === 'TRAIN' ){
		const total = parseInt(data.total) || state['TRAIN'].total
		const list = data.list || state['TRAIN'].list
		const current = parseInt(data.current) || state['TRAIN'].current
		return { ...state, TRAIN: { total, list, current } }
	}
	else if( type === 'BILLORDER' ){
		const total = parseInt(data.total) || state['BILLORDER'].total
		const list = data.list || state['BILLORDER'].list
		const current = parseInt(data.current) || state['BILLORDER'].current
		const employee_name = typeof data.employee_name === 'undefined' ? state['BILLORDER'].employee_name : data.employee_name 
		const order_nid = typeof data.order_nid === 'undefined' ? state['BILLORDER'].order_nid : data.order_nid
		return { ...state, BILLORDER: { total, list, current, order_nid, employee_name } }
	}
	else {
		return state
	}
}

export default todos