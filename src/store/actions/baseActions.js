const pushRelation = (str) => {
	return {
		type: 'PUSH_RELATION',
		relation: str
	}
}

const pushListData = (sign, data) => {
	return {
		type: sign,
		data: data
	}
}

export { pushRelation, pushListData }