import Vue from 'vue'
import App from './App'
import { request } from './util/request.js'
// 提示框
import * as Toast from './util/toast.js'
// 通用文本
import * as TEXT from './common/text.js'
// 骨架屏
import skeleton from './components/xinyi-skeleton/skeleton.vue'
// uView-UI
import uView from 'uview-ui'
// 全局参数
import store from './store'
// 日期处理函数
import dateHandle from './util/dateHandle.js'
import YKUtils from './util/global.js'
// 封装的request
import http from '@/common/vmeitime-http/index.js'
// 导入公共方法
import uitl from './util/index.js'

require('util/mock.js')

// 使用uview
Vue.use(uView)
// 引用公共方法
Vue.use(uitl)
// ----- 组件注册 ----- 
Vue.component("v-skeleton", skeleton)

// ----- 原型挂载 ----- 
Vue.prototype.$http = http
Vue.prototype.$request = request
Vue.prototype.$TEXT = TEXT
Vue.prototype.$Toast = Toast
Vue.prototype.$store = store
Vue.prototype.$dateHandle = dateHandle
Vue.prototype.$YKUtils = YKUtils

Vue.config.productionTip = false

// mpType 为了区分小程序页面组件
App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  // 这部分相当于原生小程序的 app.json
  config: {
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'first-uni-app',
      navigationBarTextStyle: 'black'
    }
  }
}
