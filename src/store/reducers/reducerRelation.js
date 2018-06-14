const relationInfo = {
	relation: ''
}

const todos = (state = relationInfo, action) => {
	switch (action.type) {
		case 'PUSH_RELATION':
			return {
				...state,
				relation: action.relation
			}
		default:
			return state
	}
}

export default todos