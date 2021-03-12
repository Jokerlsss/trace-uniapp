import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 是否登录
		ifSignIn: false,
		// 显示遮罩
		showLoading: 0,
		// 手机系统信息
		systemInfo: {
			// // 手机品牌
			// brand:'',
			// // 手机型号
			// model:''
		},
		// 版本号
		AppVersion:'',
		// 版本是否一致
		isVersionEuqal:true,
		// token过期时间
		expirationTime: 0,
		// token有效分钟数
		effectiveMinutes: 0,
		// 用户信息
		userInfo: {
			// 公司
			company: '',
			// 姓名
			userId: 0,
			userName: '',
			// 部门
			deptId: 0,
			deptName: '',
			// 岗位
			gangWeiId: 0,
			gangWei: '',
			// 班组
			banZu: '',
			// 员工编号
			num: ''
		},
		// 公司所在经纬度
		companyPosition: {
			latitude: 26.042693,
			longitude: 119.219123
		},
		// 内勤卡正常范围，单位：米
		normalDistance:200,
		
		// search每页数量
		pageSize: 10,
		// 是否从推送消息进入APP的
		isInAccordingToPush: false,
		// 由推送消息传入的url，用于跳转明细页
		urlAccordingToPush: '',
		// 单据编辑-edit
		menuList: []
		// 单据编辑-search
		// menuListSearch: []
	},
	getters: {
		showLoading(state) {
			return state.showLoading === 0
		}
	},
	mutations: {
		// 返回至登录界面
		notHasUserOrOverdue() {
			uni.reLaunch({
				url: '/pages/login/index'
			})
		},

		// 拦截是否登录
		isLogin(state) {
			if (!state.ifSignIn) {
				this.commit('notHasUserOrOverdue')
			}
		},

		// 初始化
		refresh(state, data) {
			state.ifSignIn = true
			state.userInfo = data.userInfo
		},

		// 获取用户信息 临时
		setUserInfo(state, data) {
			let userMessage = {
				company: data.company,
				userId: data.userId,
				userName: data.userName,
				deptId: data.deptId,
				deptName: data.deptName,
				gangWeiId: data.gangWeiId,
				gangWei: data.gangWei,
				banZu: data.banZu,
				num: data.userNum
			}
			state.ifSignIn = true
			state.userInfo = userMessage
		},

		// 获取手机系统信息
		setSystemInfo(state, value) {
			state.systemInfo = value
		},

		// 设置token过期时间
		set_expirationTime(state, expirationTime) {
			state.expirationTime = expirationTime
		},
		// 设置token有效分钟数
		set_effectiveMinutes(state, effectiveMinutes) {
			state.effectiveMinutes = effectiveMinutes
		},
		// 设置是否由推送信息进入页面
		set_isInAccordingToPush(state, isInAccordingToPush) {
			state.isInAccordingToPush = isInAccordingToPush
		},
		// 设置是否由推送信息进入页面
		set_urlAccordingToPush(state, urlAccordingToPush) {
			state.urlAccordingToPush = urlAccordingToPush
		},
		// 设置是否由推送信息进入页面
		reset_urlAccordingToPush(state, urlAccordingToPush) {
			state.urlAccordingToPush = ''
		},
		SHOWLOADING(state) {
			state.showLoading = state.showLoading + 1
		},
		HIDELOADING(state) {
			if (state.showLoading > 0) {
				state.showLoading = state.showLoading - 1
			}
		},
		RESETLOADING(state) {
			state.showLoading = 0
		},
		
		// 设置编辑菜单-edit
		set_menuList(state, menuList) {
			state.menuList = menuList
		},
		 // 手机版本号
		set_AppVersion(state, AppVersion) {
			state.AppVersion = AppVersion
		},
		// 手机版本是否一样（是否需要更新）
		set_isVersionEuqal(state, isVersionEuqal) {
			state.isVersionEuqal = isVersionEuqal
		},
		// 设置编辑菜单-search
		// set_menuListSearch(state, menuListSearch) {
		// 	state.menuListSearch = menuListSearch
		// }
	},
	actions: {
		showloader: ({
			commit
		}) => {
			commit('SHOWLOADING')
		},
		hideloader: ({
			commit
		}) => {
			commit('HIDELOADING')
		},
		resetloader: ({
			commit
		}) => {
			commit('RESETLOADING')
		}
	}
})

export default store
