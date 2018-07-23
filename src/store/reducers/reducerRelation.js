const relationInfo = {
	relation: ''
}

const todos = (state = relationInfo, { type, relation }) => {
	switch (type) {
		case 'PUSH_RELATION':
			return {
				...state,
				relation: relation
			}
		default:
			return state
	}
}

export default todos