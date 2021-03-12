import http from './interface'
import store from "@/store/index.js"
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */
// ?模拟已经超时
// let flagBool = false
// 是否正在刷新token
let isRefreshing = false
module.exports = {
  request: (option) => {
    // 百度鹰眼接口
    http.config.baseUrl = "http://yingyan.baidu.com/api/v3"
    // store.dispatch('showloader')
    return http.request({
      url: option.url,
      data: option.data,
	  // form-data 的形式
	  header: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	      },
      method: option.method
    })
  },
}
//设置请求前拦截器
// http.interceptor.request = (config) => {
//   // 如果是不需要token的接口直接返回即可
//   if (config.url.split(http.config.baseUrl)[1] === '/login') {
//     return config
//   }
//   let token = uni.getStorageSync("token")
//   delete config.header['Authorization']
//   // 因为login不需要token所以拦截不到
//   if (!token) {
//     store.commit("notHasUserOrOverdue")
//   }
//   // 获取刷新token
//   // let refreshToken = uni.getStorageSync('refreshToken')
//   // todo  过期方法  暂未实现 
//   if (isTokenExpired() && config.url.split(http.config.baseUrl)[1] !== '/refresh-token') {
//     console.log('进入超时节点')
//     if (!isRefreshing) {
//       isRefreshing = true
//       http.request({
//           url: '/refresh-token',
//           method: 'post',
//           data: {
//             accessToken: uni.getStorageSync('token'),
//             refreshToken: uni.getStorageSync('refreshToken')
//           }
//         })
//         .then(res => {
//           isRefreshing = false
//           if (!res.isSuccess) {
//             subscribesArr = []
//             store.commit("notHasUserOrOverdue")
//             return false
//           }
//           // ?模拟
//           // flagBool = false
//           console.log('请求成功！换新token调接口')
//           const tokenVo = res.data
//           uni.setStorageSync("token", tokenVo)
//           // 获取刷新时间
//           let expiredTime = new Date().getTime() + store.state.effectiveMinutes * 60 * 1000
//           // 赋值token刷新时间
//           store.commit('set_expirationTime', expiredTime)
//           // 用新token刷新请求
//           reloadSubscribesArr(tokenVo)
//         })
//         .catch(() => {
//           // 如果失败则清空请求接口、缓存、返回login
//           subscribesArr = []
//           store.commit("notHasUserOrOverdue")
//         })
//     }
//     // 创建回调函数promise
//     let retry = new Promise((resolve, reject) => {
//       // 传入请求至缓存的请求数组 将新的token替换至config 返回回调函数
//       subscribeTokenRefresh((newToken) => {
//         config.headers.Authorization = `Bearer ${newToken}`
//         resolve(config)
//       })
//     })
//     console.log(subscribesArr)
//     return retry
//   } else {
//     config.header['Authorization'] = 'Bearer ' + token
//     return config
//   }
// }
// //设置请求结束后拦截器
// http.interceptor.response = async (response) => {
//   if (/^2*/.test(response.statusCode)) { //成功
//     // uni.hideLoading()
//     store.dispatch('hideloader')
//     return response.data
//   } else {
//     store.dispatch('hideloader')
//     uni.showToast({
//       title: '连接失败！',
//       icon: 'none',
//       duration: 1500,
//       success: () => {
//         uni.hideLoading()
//       }
//     })
//     return
//   }
// }

// // 挂起数组
// let subscribesArr = []
// // push所有请求到数组中
// function subscribeTokenRefresh(cb) {
//   console.log('给进来promise')
//   subscribesArr.push(cb)
// }
// // 用新token发起请求
// function reloadSubscribesArr(token) {
//   console.log('换token调用')
//   subscribesArr.map(cb => cb(token))
// }
// // 已过期了or快过期了
// function isTokenExpired() {
//   let expiredTime = store.state.expirationTime
//   if (expiredTime) {
//     let nowTime = new Date().getTime()
//     let willExpired = (expiredTime - nowTime) / 1000 < 10 * 60
//     return willExpired
//   }
//   return false
// }