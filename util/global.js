/**
 * @description : 四舍五入保留小数位数
 * @param {Number}  value : 传入的数值
 * @param {Number}  digits : 要保留的位数
 */
export default {
	keepDecimal(value, digits) {
		// 返回的结果
		let result
		// 需要保留位数的参数，
		let params = 1
		for (let i = 0; i < digits; i++) {
			params = params * 10
		}
		result = Math.round(value * params) / params
		return result
	},

	/**
	 * @description 千分位表示
	 * 使用前推荐先使用 parseFloat 强转和用 keepDecimal 保留位数后再转千分位
	 */
	formatThousandStyle(number) {
		var num = number + "";
		num = num.replace(new RegExp(",", "g"), "");
		// 正负号处理
		var symble = "";
		if (/^([-+]).*$/.test(num)) {
			symble = num.replace(/^([-+]).*$/, "$1");
			num = num.replace(/^([-+])(.*)$/, "$2");
		}

		if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
			var num = num.replace(new RegExp("^[0]+", "g"), "");
			if (/^\./.test(num)) {
				num = "0" + num;
			}

			var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, "$1");
			var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, "$1");
			var re = /(\d+)(\d{3})/;

			while (re.test(integer)) {
				integer = integer.replace(re, "$1,$2");
			}
			return symble + integer + decimal;
		} else {
			return number;
		}
	},

	// 移除数组为null,''的属性
	removeArrayNull(array) {
		for (let obj of array) {
			Object.keys(obj).forEach(item => {
				if (!obj[item]) {
					delete obj[item]
				}
			})
		}
		return array
	},

	// 移除对象为null,''的属性
	removeObjectNull(obj) {
		let copy = JSON.parse(JSON.stringify(obj))
		Object.keys(copy).forEach(item => {
			if (!copy[item]) {
				delete copy[item]
			}
		})
		return copy
	},

	/**
	 * 计算明细中的总和
	 * @param {Array}  arr  明细数组
	 * @param {String}  key  需要求和的字段key
	 */
	countTotal(arr, key) {
		let result = arr.reduce((prev, cur, index, array) => {
			return prev + parseFloat(cur[key])
		}, 0)
		return result
	},

	/**
	 * 合并数组中的值转为字符串
	 * 示例：合并数组中key为id的值，并转为字符串如："1,2,3"
	 * @param {Object} arr 原数组
	 * @param {Object} key 需要进行合并键值
	 */
	concatByArr(arr, key) {
		let result = arr.reduce((prev, cur, index, array) => {
			if (array.length === index + 1) {
				return prev + cur[key]
			}
			return prev + cur[key] + ','
		}, '')
		return result
	},
}
