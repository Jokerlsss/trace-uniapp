// uni.request -> Promise
// errorHandle
// 避免重复请求

import * as Toast from './toast.js'

// 以 key-value 形式存放请求缓存 
const pending = {}

const errorHandle = (res) => {
	// 1. 日期处理
	// 2. 全局错误提示
	console.log('errHandle -> res', res)
	// Toast.failToast()
}

// 电杆dev
const BASE_URL = 'http://192.168.103.50:21000'
// const BASE_URL = 'http://localhost:5000'

export const request = (options) => {
	const key = options.url + '&' + (options.method || 'GET')

	const result = new Promise((resolve, reject) => {
		Toast.loadToast()

		const handler = uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},

			// 请求成功
			success: (res) => {
				delete pending[key]
				// 10.27 暂时去除 isSuccess 的判断，等待真实接口再进行重新封装
				// if (res.data.isSuccess) {
					resolve(res)
				// } else {
				// 	errorHandle(res)
				// 	reject(res)
				// }
			},

			// 请求失败
			fail: (err) => {
				delete pending[key]
				console.log('err',err)
				// Toast.failToast()
				errorHandle(err)
				reject(err)
			},

			// 不管请求成功与否都会执行
			complete: () => {
				uni.hideLoading()
			}
		})
		if (pending[key]) {
			// 如果缓存中有请求，则中止后续的连续请求。
			pending[key].abort()
		}
		// setTimeout 不可删除！否则仍无法中止连续请求。
		setTimeout(() => {
			// 存放请求缓存
			pending[key] = handler
		}, 0)
	})
	return result
}

// request 挂载原型后的使用示例:
//  const res = await this.$request({
// 		url: '/api/getUser',
// 		method: 'POST',
// 		data: {
// 			...
// 		}
// 	})

export const axios = {
	get(url, data) {
		return request({
			url,
			data,
			method: 'GET'
		})
	},
	post(url, data) {
		return request({
			url,
			data,
			method: 'POST'
		})
	}
}
