import XEUtils from 'xe-utils'
export default {
	// 日期格式化
	ykDateFormat(fmt, str) {
		if (!str) {
			return ''
		}
		// 解决手机端仍显示1900日期问题
		if ((typeof str === 'string') && (str.substr(0, 4) === '1900')) {
			return ''
		}
		var date = new Date(str)
		if (!date) {
			return ''
		}
		if (date.getFullYear() === 1900) {
			return ''
		} else {
			// 以下格式格式化会出错：2020-2-21
			// 正确格式：2020-02-21
			return XEUtils.toDateString(str, fmt)
		}
	},
	// 日期选择框格式化返回时间
	ykTimeSelectSureBack(value) {
		let str = ''
		
		if (value.year && value.month && value.day && value.hour && value.minute && value.second) {
			if(value.month<10){
				value.month='0'+parseInt(value.month)
			}
			if(value.day<10){
				value.day = '0'+parseInt(value.day)
			}
			if(value.hour<10){
				value.hour = '0'+parseInt(value.hour)
			}
			if(value.minute<10){
				value.minute = '0'+parseInt(value.minute)
			}
			if(value.second<10){
				value.second = '0'+parseInt(value.second)
			}
			str = value.year + '-' + value.month + '-' + value.day + ' ' + value.hour + ':' + value.minute + ':' + value.second
		} else if (value.year && value.month && value.day && value.hour && value.minute) {
			if(value.month<10){
				value.month='0'+parseInt(value.month)
			}
			if(value.day<10){
				value.day = '0'+parseInt(value.day)
			}
			if(value.hour<10){
				value.hour = '0'+parseInt(value.hour)
			}
			if(value.minute<10){
				value.minute = '0'+parseInt(value.minute)
			}
			str = value.year + '-' + value.month + '-' + value.day + ' ' + value.hour + ':' + value.minute
		} else if (value.year && value.month && value.day && value.hour) {
			if(value.month<10){
				value.month='0'+parseInt(value.month)
			}
			if(value.day<10){
				value.day = '0'+parseInt(value.day)
			}
			if(value.hour<10){
				value.hour = '0'+parseInt(value.hour)
			}
			str = value.year + '-' + value.month + '-' + value.day + ' ' + value.hour + ':00'
		} else if (value.year && value.month && value.day) {
			if(value.month<10){
				value.month='0'+parseInt(value.month)
			}
			if(value.day<10){
				value.day = '0'+parseInt(value.day)
			}
			str = value.year + '-' + value.month + '-' + value.day
		} else {
			str = ''
		}
		return str
	},
	// 金额格式化
	ykFormatAccount(value, digits, ifShowMoney) {
		if (!ifShowMoney) {
			return '***'
		} else {
			return XEUtils.commafy(value, {
				digits: digits || 2
			})
		}
	},

	/**
	 * 用来得到精确的加法结果
	 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
	 * 调用：accAdd(arg1,arg2)
	 * 返回值：arg1加上arg2的精确结果
	 * @param {Object} arg1
	 * @param {Object} arg2
	 */
	accAdd(arg1, arg2) {
		var r1, r2, m;
		try {
			r1 = arg1.toString().split(".")[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split(".")[1].length
		} catch (e) {
			r2 = 0
		}
		m = Math.pow(10, Math.max(r1, r2))
		return (arg1 * m + arg2 * m) / m
	},

	//减法函数
	accSub(arg1, arg2) {
		var r1, r2, m, n;
		try {
			r1 = arg1.toString().split(".")[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split(".")[1].length
		} catch (e) {
			r2 = 0
		}
		m = Math.pow(10, Math.max(r1, r2));
		//last modify by deeka
		//动态控制精度长度
		n = (r1 >= r2) ? r1 : r2;
		return ((arg1 * m - arg2 * m) / m).toFixed(n);
	},

	/*
	 * 除法函数，用来得到精确的除法结果
	 * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
	 * 调用：accDiv(arg1,arg2)
	 * 返回值：arg1除以arg2的精确结果
	 */
	// accDiv(arg1, arg2) {
	// 	var t1 = 0,
	// 		t2 = 0,
	// 		r1, r2;
	// 	try {
	// 		t1 = arg1.toString().split(".")[1].length
	// 	} catch (e) {}
	// 	try {
	// 		t2 = arg2.toString().split(".")[1].length
	// 	} catch (e) {}
	// 	with(Math) {
	// 		r1 = Number(arg1.toString().replace(".", ""))
	// 		r2 = Number(arg2.toString().replace(".", ""))
	// 		return (r1 / r2) * pow(10, t2 - t1);
	// 	}
	// },

	/*
	 * 乘法函数，用来得到精确的乘法结果
	 * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
	 * 调用：accMul(arg1,arg2)
	 * 返回值：arg1乘以arg2的精确结果
	 */
	accMul(arg1, arg2) {
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length
		} catch (e) {}
		try {
			m += s2.split(".")[1].length
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	}
}
