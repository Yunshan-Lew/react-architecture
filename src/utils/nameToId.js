const nameToId = function(val, arr){
	let result = arr.filter( (item) => {
		return item.employee_name === val
	} )
	return result.length > 0 ? result[0].employee_id : ''
}

export default nameToId