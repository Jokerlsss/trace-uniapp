<!-- 该文件等同于小程序的 app.js -->
<script>
	export default {
		name: 'app',
		data() {
			return {
				dataBaseVersion: ''
			}
		},
		created() {
			// #ifdef APP-PLUS
			// 添加监听从系统消息中心点击某条消息启动应用事件
			plus.push.addEventListener("click", msg => {
				// 分析msg.payload处理业务逻辑
				if (!msg.payload) {
					return
				}
				this.handlePush(msg)
			}, false); // false: 在冒泡阶段执行；true: 在捕获阶段执行
			// #endif
		},
		mounted() {
			// #ifdef H5
			window.addEventListener('beforeunload', () => {
				uni.removeStorageSync('storeState')
				uni.setStorageSync('storeState', this.$store.state)
			})
			if (uni.getStorageSync('storeState').ifSignIn) {
				this.$store.commit('refresh', uni.getStorageSync('storeState'))
			}
			// #endif
		},
		methods: {
			// 保存系统硬件信息
			getSystemInfo() {
				uni.getSystemInfo({
					success: (res) => {
						this.$store.commit('setSystemInfo', res)
					}
				})
			},

			// 处理点击推送消息后的事件
			handlePush(msg) {
				// 保存由推送消息传入的需跳转页的路径
				this.$store.commit('set_urlAccordingToPush', msg.payload)

				// 使用reLaunch唤起APP，当APP在后台时，可以直接拉起；
				// 否则会被拦截器跳转到登录界面,并通过全局参数urlAccordingToPush进行二次判定
				if (this.$store.state.ifSignIn) {
					uni.reLaunch({
						// 1.重定向到首页
						url: '../navigation/index',
						success: () => {
							uni.navigateTo({
								// 2.跳转到消息推送指定单据，payload格式：../approve/index
								url: msg.payload
							});
						}
					})
				} else {
					uni.reLaunch({
						// 重定向到首页
						url: '../login/index'
					})
				}
			},
			// 获取版本 & 更新
			async getVersionAndUpdate() {
				// 获取当前版本号
				this.getAppVersion()

				// 获取数据库版本号
				await this.getDataBaseVersion()

				// 比较
				let isVersionEuqal = this.compareVersion()
				this.commit('set_isVersionEuqal',isVersionEuqal)

				// 版本一样
				if (isVersionEuqal) {
					return
				}

				// 版本不一样
				uni.showModal({
					title: '提示',
					content: '程序有新版本，请立即更新',
					showCancel: true,
					confirmText: '更新',
					success: res => {
						// 若点了取消则退出APP
						if (res.cancel) {
							this.exitAPP()
							return
						}
						this.handleUpdateAPP()
					},
					fail: () => {
						this.exitAPP()
					},
					complete: () => {}
				});
			},
			// 获取当前应用版本号
			getAppVersion() {
				plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
					console.log(wgtinfo.version);
					this.commit('set_AppVersion', wgtinfo.version)
				})
			},
			// 获取数据库中的版本号
			async getDataBaseVersion() {
				// this.dataBaseVersion = '1.0.1'
				const res = await this.$http.request({
					url: '/app/version',
					method: 'get'
				})
				if (res.isSuccess) {
					this.dataBaseVersion = res.data
					console.log('this.dataBaseVersion',this.dataBaseVersion);
				}
			},
			compareVersion() {
				if (this.$store.state.AppVersion === this.dataBaseVersion) {
					return true
				}
				return false
			},
			// 更新APP事件
			handleUpdateAPP() {
				// TODO 更新
			},
			// 退出APP(目前仅支持Android)
			exitAPP() {
				plus.runtime.quit();
			}
		},
		onLaunch() {
			this.getSystemInfo()

			// #ifdef APP-PLUS
			this.getVersionAndUpdate()
			// #endif

			// this.$store && this.$store.commit('isLogin')
		},
		computed: {
			showLoading() {
				return this.$store.state.showLoading
			}
		},
		watch: {
			showLoading: {
				handler(newValue, oladValue) {
					newValue > 0 ?
						uni.showLoading({
							title: '加载中',
							mask: true
						}) :
						uni.hideLoading()
				}
			}
		}
	};
</script>

<!-- /**
	 * 可在此加入全局样式
	 * 相当于小程序的 app.wxss
	 * @import 要写在首行
	 */ -->
<style lang="scss">
	@import "uview-ui/index.scss";
</style>
