const pushDetailData = (sign, data) => {
	return {
		type: sign,
		data: data
	}
}

const pushListData = (sign, data) => {
	return {
		type: sign,
		data: data
	}
}

export { pushDetailData, pushListData }
