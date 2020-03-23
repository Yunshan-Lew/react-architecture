const detailInfo = {
	relation: ''
}

const todos = (state = detailInfo, { type, data }) => {
	switch (type) {
		case 'PUSH_RELATION':
			return {
				...state,
				relation: data
			}
		default:
			return state
	}
}

export default todos
