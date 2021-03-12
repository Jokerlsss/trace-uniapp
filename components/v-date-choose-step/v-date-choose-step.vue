<!-- 
	Date: 
	Author: liushuo
	Description: 日期步进器
-->
<template>
	<view class="date-step">
		<view class="left_date-step" @click="leftEvent">
			<image src="../../static/img/left-arrow.png"></image>
		</view>
		<view class="middle_date-step">
			{{dateTime}}
		</view>
		<view class="right_date-step" @click="rightEvent">
			<image src="../../static/img/right-arrow.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 日期格式
			dateType: {
				type: String,
				default: 'date'
			}
		},
		computed: {
			// 展示的日期
			dateTime() {
				let month = this.month
				if (month < 10) {
					return this.year + '.0' + month
				}
				return this.year + '.' + month
			}
		},
		data() {
			return {
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				// 当前日期
				currentDate: new Date()
			};
		},
		methods: {
			leftEvent() {
				// 递减月份
				if (this.month === 1) {
					this.year -= 1
					this.month = 12
					return
				}
				this.month--
			},
			rightEvent() {
				if (!this.isCanChange()) {
					uni.showToast({
						title: '超出当前的日期',
						image: '/static/img/err.png',
						duration: 1500,
						mask: true
					})
					return
				}

				// 递增月份
				if (this.month === 12) {
					this.year += 1
					this.month = 1
					return
				}
				this.month++
			},
			// 判断日期是否超过当前日期
			isCanChange() {
				if (this.year === this.currentDate.getFullYear() && this.month === (this.currentDate.getMonth() + 1)) {
					return false
				}
				return true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.date-step {
		display: flex;
		align-items: center;
		width: 300rpx;
		height: 60rpx;
		justify-content: center;

		.left_date-step {
			width: 20%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #999999;
			font-weight: 600;

			>image {
				height: 24rpx;
				width: 24rpx;
			}

			&:active {
				background-color: $uni-color-primary;
				border-radius: 50%;
			}
		}

		.middle_date-step {
			width: 60%;
			height: 100%;
			justify-content: center;
			display: flex;
			align-items: center;
			color: $uni-color-primary;
			font-weight: 600;
		}

		.right_date-step {
			width: 20%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #999999;
			font-weight: 600;

			>image {
				height: 24rpx;
				width: 24rpx;
			}

			&:active {
				background-color: $uni-color-primary;
				border-radius: 50%;
			}
		}
	}
</style>
