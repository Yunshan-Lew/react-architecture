import moment from 'moment'

const defaultStore = {
	EMPLOYEE: {
		total: 0,
		list: []
	},
	TRAIN: {
		total: 0,
		list: []
	},
	BILLORDER: {
		total: 0,
		list: []
	}
}

const todos = (state = defaultStore, { type, data }) => {
	if( type === 'EMPLOYEE' ){
		const total = Number(data.total || state['EMPLOYEE'].total)
		const list = data.list || state['EMPLOYEE'].list
		return { ...state, EMPLOYEE: { total, list } }
	}
	else if( type === 'TRAIN' ){
		const total = Number(data.total || state['TRAIN'].total)
		const list = data.list || state['TRAIN'].list
		return { ...state, TRAIN: { total, list } }
	}
	else if( type === 'BILLORDER' ){
		const total = Number(data.total || state['BILLORDER'].total)
		const list = data.list || state['BILLORDER'].list
		return { ...state, BILLORDER: { total, list } }
	}
	else {
		return state
	}
}

export default todos
