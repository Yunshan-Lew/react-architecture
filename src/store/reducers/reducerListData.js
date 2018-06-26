const defaultStore = {
	BILLORDER: {
		order_nid: "",
		employee_name: "",
		pagination: {
			total: 0,
			current: 1,
			pageSize: 10
		}
	}
}

const todos = (state = defaultStore, action) => {
	switch (action.type) {
		case 'BILLORDER':
			return {
				...state,
				BILLORDER: action.data
			}
		default:
			return state
	}
}

export default todos