const pushRelation = (str) => {
	return {
		type: 'PUSH_RELATION',
		relation: str
	}
}

export { pushRelation }