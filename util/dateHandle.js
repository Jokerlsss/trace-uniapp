/**
 * @description : 格式化日期
 * @default : yyyy-MM-dd
 * @example : $dateHandle.formateDate(new Date(),'yyyy-MM-dd')
 */
const formateDate = (date, formatter) => {
	let str = ''

	let year = date.getFullYear()
	let month = singleNumAddZero(date.getMonth() + 1)
	let day = singleNumAddZero(date.getDate())

	let hour = singleNumAddZero(date.getHours())
	let min = singleNumAddZero(date.getMinutes())
	let seconds = singleNumAddZero(date.getSeconds())

	switch (formatter) {
		case 'yyyy-MM-dd':
			str = year + '-' + month + '-' + day
			break
		case 'yyyy-MM-dd HH':
			str = year + '-' + month + '-' + day + ' ' + hour
			break
		case 'yyyy-MM-dd HH:mm':
			str = year + '-' + month + '-' + day + ' ' + hour + ':' + min
			break
		case 'yyyy-MM-dd HH:mm:ss':
			str = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + seconds
			break
		default:
			str = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + seconds
			break
	}
	return str
}

// 个位数的开头补0
function singleNumAddZero(value){
	if(value<10){
		return '0'+value
	}
	return value
}

export default{
	formateDate
}