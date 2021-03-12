<!-- 
	Date: 
	Author: liushuo
	Description: 登录界面
-->
<template>
	<view class="container" :style="(ispdFocus || isuserFocus)?containerHeight.focus:containerHeight.blur">
		<view class="input-area">
			<view class="user-icon">
				<image :src="userImg" :style="isDisabledBtn?'opacity:0.5':'opacity:1'"></image>
			</view>
			<!-- 用户名输入框 -->
			<view class="input-text" :style="isuserFocus?input_boder_style.focus:input_boder_style.blur">
				<view :style="isuserFocus?label_style.focus:label_style.blur">
					帐 号
				</view>

				<u-input :focus="un" v-model="userLoginInfo.userName" type="text" :height="100" placeholder=""
					:custom-style="customStyle" :clearable="false" @focus="userFocus" @blur="userBlur" />

				<view class="clear" @click="clearInput('userName')" v-show="userLoginInfo.userName!=='' && isuserFocus">
					<image :src="clearImg" class="img"></image>
				</view>
			</view>
			<!-- 密码输入框 -->
			<view class="input-text" :style="ispdFocus?input_boder_style.focus:input_boder_style.blur">
				<view :style="ispdFocus?label_style.focus:label_style.blur">
					密 码
				</view>

				<u-input :focus="pd" v-model="userLoginInfo.password" type="password" :password-icon="false"
					:height="100" placeholder="" :maxlength="pdMaxLength" :custom-style="customStyle" :clearable="false"
					@focus="pdFocus" @blur="pdBlur" />

				<view class="clear" @click="clearInput('password')" v-show="userLoginInfo.password!=='' && ispdFocus">
					<image :src="clearImg" class="img"></image>
				</view>
			</view>

			<!-- 登录按钮 -->
			<view class="btn">
				<u-button size="default" :loading="isLogining" :ripple="true"
					:custom-style="isDisabledBtn?login_btn_style.disabled:login_btn_style.able"
					:disabled="isDisabledBtn" @click="login">{{isLogining?'':'登 录'}}</u-button>
			</view>

			<u-toast ref="uToast"></u-toast>
		</view>
		<view class="copy-right">CopyRight 2020.09.20 FZYK</view>
	</view>
</template>

<script>
	export default {
		onUnload() {
			// plus.screen.unlockOrientation();
		},
		onLoad() {
			this.initInput()
		},
		data() {
			return {
				// ------------- 其他 -------------
				userLoginInfo: {
					userName: '',
					password: ''
				},

				// 整体容器高度，单位 rpx
				containerHeight: {
					focus: 'height:800rpx;transition:0.2s',
					blur: 'height:1300rpx;transition:0.2s'
				},

				// 获取焦点时，整体上移的动画效果
				animationData: {},

				// 登录界面的用户图标
				userImg: '../../static/img/user.png',

				// 是否正在清除
				isClearing: false,

				// ------------- 输入框 -------------
				pdMaxLength: 10,
				// 输入框是否获取到焦点
				isuserFocus: false,
				ispdFocus: false,

				// 输入框自定义样式
				customStyle: {
					"padding-left": "40rpx",
					// 使光标消失（iOS无效果）
					"color": "transparent",
					"text-shadow": "0 0 0 #000"
				},

				// 清除按钮图标
				clearImg: '../../static/img/clear.png',

				// 输入框 label 样式
				label_style: {
					focus: 'width:100rpx;display:flex;justify-content:center;color:#6C9EFF;font-weight:bold;transform:scale(1.1)',
					blur: 'width:100rpx;display:flex;justify-content:center;color:#aaaaaa;transform:scale(1)'
				},

				input_boder_style: {
					focus: 'border-bottom: 1px solid #6C9EFF;',
					blur: 'border-bottom: 1px solid #e4e4e4;'
				},

				// ------------- 登录按钮 -------------
				// 登录按钮自定义样式
				login_btn_style: {
					able: {
						"width": "100%",
						"height": "100rpx",
						"border-radius": "20rpx",
						"border": "#e4e4e4",
						"background-color": "#6C9EFF",
						"color": "#fff"
					},
					disabled: {
						"width": "100%",
						"height": "100rpx",
						"border-radius": "20rpx",
						"border": "#e4e4e4",
						"background-color": "#6C9EFF",
						"color": "#fff",
						"opacity": "0.5"
					}
				},

				// 点击登录按钮后，接口返回数据前，对该操作上锁
				isLogining: false,

				// 输入框是否聚焦
				un: false,
				pd: false,

				// 客户端标识
				cid: ''
			}
		},

		methods: {
			userFocus() {
				// 是否在焦点上
				this.isuserFocus = true
			},
			userBlur() {
				setTimeout(() => {
					this.isuserFocus = false
				}, 1)
			},

			pdFocus() {
				this.ispdFocus = true
			},
			pdBlur() {
				// 失去焦点事件先于清除事件触发，因此让其延迟即可先触发 clearInput 事件
				setTimeout(() => {
					this.ispdFocus = false
				}, 1)
			},

			// 清除 input 内容
			clearInput(value) {
				switch (value) {
					case 'userName':
						setTimeout(() => {
							this.userLoginInfo.userName = ''
							// 清空内容之后保持焦点
							this.un = false
							this.$nextTick(() => {
								this.un = true
							})
						}, 2)
						break
					case 'password':
						setTimeout(() => {
							this.userLoginInfo.password = ''
							this.pd = false
							this.$nextTick(() => {
								this.pd = true
							})
						}, 2)
						break
				}
			},

			async login() {
				let that = this
				this.cid = this.getCID()

				if (this.isDisabledBtn) {
					// 登录按钮被禁用时
					this.$Toast.unCompleteToast()
					return
				}
				// isLogining：显示按钮 loading 样式
				this.isLogining = true
				this.$http.request({
					method: 'post',
					url: '/login',
					data: {
						userName: this.userLoginInfo.userName,
						password: this.md5(this.userLoginInfo.password),
						// 来自手机端为1，PC端为0
						isFromPhone: 1,
						clientID: this.cid
					}
				}).then(res => {
					if (!res.isSuccess) {
						this.isLogining = false
						this.$refs.uToast.show({
							title: res.errorMessage || '请求失败，请重试',
							type: 'error'
						})
						return
					}
					that.handleLoginSuccess(res)
				}).catch(err => {
					this.isLogining = false
					this.$store.dispatch('resetloader')
					this.$Toast.handleToast('网络请求失败！', 'err', false)
				})
			},

			// 登录成功处理
			handleLoginSuccess(res) {
				const that = this
				// 保存号密在本地缓存
				that.saveUserStorage()

				that.$refs.uToast.show({
					title: '登录成功',
					type: 'success',
					duration: '1000',
					callback: res => {
						that.redirectToIndex()
					}
				})
				// 保存token
				that.setToken(res)

				// 设置token过期时间
				that.setExpiredTime(res)

				// 将三级菜单处理成二级菜单
				that.handleMenuList(res)

				// 保存用户信息
				that.$store.commit('setUserInfo', res.data)

				// 设置 CID
				that.setCID()

				// 解除请求锁
				that.$nextTick(() => {
					that.isLogining = false
				})
			},

			// 将密码和用户名存入本地缓存
			saveUserStorage() {
				let UserObj = {
					username: this.userLoginInfo.userName,
					password: this.userLoginInfo.password
				}
				uni.setStorage({
					key: 'userLoginInput',
					data: UserObj,
					success: (res) => {}
				});
			},

			// 登录成功，页面跳转
			redirectToIndex() {
				uni.redirectTo({
					// 登录成功后跳转到首页并清空登录页面栈
					url: '/pages/navigation/index',
					success: res => {
						if (this.$store.state.urlAccordingToPush !== '') {
							// 如果是从推送消息点击唤醒APP的，则跳转到推送消息中参数所带的路径
							this.navigateAccodingToPush()
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},

			// 设置token过期时间
			setExpiredTime(res) {
				// token过期时间
				let expiredTime = new Date().getTime() + res.data.expire * 60 * 1000
				this.$store.commit('set_expirationTime', expiredTime)
				// token有效分钟数
				this.$store.commit('set_effectiveMinutes', res.data.expire)
			},

			// 保存token
			setToken(res) {
				// 保存用户登录token及过期时间等信息
				uni.setStorageSync("token", res.data.accessToken)
				uni.setStorageSync("refreshToken", res.data.refreshToken)
			},

			// 将三级菜单处理成二级菜单
			handleMenuList(res) {
				if (res.data.authorityList.length > 0) {
					// 获取菜单权限
					uni.setStorageSync("menuList", res.data.authorityList)
					let menuList = res.data.authorityList[0].children
					// 保存菜单
					this.$store.commit('set_menuList', menuList)
				}
			},

			// 由推送消息所带路径参数进行跳转
			navigateAccodingToPush() {
				uni.navigateTo({
					// 跳转到消息推送指定单据
					url: this.$store.state.urlAccordingToPush,
					success: () => {
						// 清空推送消息中的url
						this.$store.commit('reset_urlAccordingToPush')
					}
				});
			},

			// 初始化输入框取值，查看是否有本地缓存号密
			initInput() {
				uni.getStorage({
					key: 'userLoginInput',
					success: (res) => {
						// 若成功取得缓存，则将缓存值绑定到input上
						this.userLoginInfo.userName = res.data.username
						this.userLoginInfo.password = res.data.password
						
						// 自动登录
						if (this.$store.state.isVersionEuqal) {
							// 手机不需要更新时，自动登录
							this.login()
						}
					},
					fail: (err) => {
						// 返回无值时，将input框清空
						this.userLoginInfo.userName = ''
						this.userLoginInfo.password = ''
					},
					complete: () => {}
				});
			},

			// 保存客户端标识
			setCID() {
				uni.getStorage({
					key: 'cid',
					success: (res) => {
						// Nothing
					},
					fail: (err) => {
						// 缓存无cid，则保存进缓存
						uni.setStorageSync("cid", this.cid)
					},
					complete: () => {}
				});
			},

			// 获取客户端标识
			getCID() {
				let cid = ''

				// #ifdef APP-PLUS
				let pinf = plus.push.getClientInfo();
				cid = pinf.clientid;
				// #endif

				return cid
			}
		},
		computed: {
			// 登录按钮是否禁用
			isDisabledBtn() {
				if (this.userLoginInfo.userName === '' || this.userLoginInfo.password === '') {
					return true
				}
				return false
			}
		},
		watch: {}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: flex-end;
		width: 100%;


		.input-area {
			width: 80%;

			.user-icon {
				width: 100%;
				display: flex;
				justify-content: center;

				>image {
					width: 150rpx;
					height: 150rpx;
				}
			}

			.input-text {
				display: flex;
				flex-wrap: nowrap;
				align-items: center;
				margin-top: 20rpx;

				.clear {
					height: 100rpx;
					display: flex;
					align-items: center;

					.img {
						height: 36rpx;
						width: 36rpx;
					}
				}
			}

			.btn {
				margin-top: 40rpx;

				.login-btn {
					width: 100%;
					border-radius: 20rpx;
					border: $uni-color-primary;
					background-color: $uni-color-primary;
					color: $uni-text-color-inverse;
				}
			}
		}


		.copy-right {
			// bottom: 100rpx;
			bottom: 0;
			width: 100%;
			color: $uni-text-color-grey;
			text-align: center;
			font-size: 24rpx;
		}
	}
</style>
