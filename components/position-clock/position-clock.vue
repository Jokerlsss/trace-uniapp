<template>
	<view>
		<view class="clock u-skeleton">
			<view class="top">
				<image :src="clockIcon" class="u-skeleton-fillet"></image>
				<view class="u-skeleton-fillet">
					已打卡<span>2</span> /4
				</view>
			</view>

			<view class="middle">
				<!-- 步骤条 -->
				<v-clock-step v-for="(stepItem,index) in clockStep" :key="index" :isClock="stepItem.isClock" :isClockSuccess="stepItem.isClockSuccess"
				 :isLine="stepItem.isLine" :title="stepItem.title" :clockTime="stepItem.clockTime" class="u-skeleton-rect">
				</v-clock-step>
			</view>

			<view class="bottom">
				<view class="bottom-btn u-skeleton-fillet">
					<view id="bottom-btn-title">下班打卡</view>
					<view id="bottom-btn-time">14:23:07</view>
				</view>
				<view class="bottom-position u-skeleton-fillet">
					<image src="../../static/img/yes.png"></image>
					<view>
						已进入打卡范围：这是考勤组设置的打卡范围
					</view>
				</view>
			</view>

		</view>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		mounted() {
			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		data() {
			return {
				loading: true,
				clockIcon: require("../../static/img/circle-picture.png"),

				clockStep: [{
						isClock: true,
						isClockSuccess: true,
						title: '上班打卡',
						clockTime: '08:30'
					},
					{
						isClock: true,
						isClockSuccess: true,
						title: '下班打卡',
						clockTime: '12:00'
					},
					{
						isClock: true,
						isClockSuccess: false,
						title: '上班打卡',
						clockTime: '14:00'
					},
					{
						isClock: false,
						isClockSuccess: false,
						isLine: false,
						title: '下班打卡',
						clockTime: '17:30'
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	%container-common {
		border-radius: 30rpx;
		background-color: #fff;
	}

	%padding-left-right-40 {
		padding: 0 40rpx;
	}

	.clock {
		@extend %container-common;
		width: 100%;
		// 警告！若该高度改变，则需调整如下 top、middle、bottom 的高度
		height: 1100rpx;

		.top {
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			// margin-bottom: 20rpx;

			font-size: 28rpx;
			color: $uni-text-color-grey;

			view>span {
				margin-left: 10rpx;
				color: $uni-color-primary;
				font-weight: bold;
			}


			>image {
				margin: 0 10rpx;
				width: 28rpx;
				height: 28rpx;
			}
		}

		// ---------------- 中部步骤条 ----------------
		.middle {
			@extend %padding-left-right-40;
			width: 100%;
			// 警告！若该高度改变，则需调整组件 v-step 中的高度
			height: 770rpx;
			// padding-top:50 = Height(middle) - 4 * Height(v-step) = 770 - 4*180
			padding-top: 50rpx;
		}

		// ---------------- 底部打卡按钮 ----------------
		.bottom {
			@extend %padding-left-right-40;
			width: 100%;
			height: 250rpx;
			// background-color: #F3C9C3;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;

			.bottom-btn {
				&:active {
					opacity: 0.7;
					transition: 0.1s;
					box-shadow: 0px 0px 0px;
				}

				height: 100rpx;
				width: 100%;
				display: flex;
				// align-items: center;
				// flex-wrap: wrap;

				border-radius: 60rpx;
				background-color: $uni-color-primary;
				box-shadow: 0px 3px 8px $uni-color-primary;

				#bottom-btn-title {
					height: 100%;
					width: 50%;
					color: #fff;
					display: flex;
					// justify-content: center;
					align-items: center;
					margin-left: 40rpx;
					font-size: 40rpx;
					font-weight: 500;
				}

				#bottom-btn-time {
					// margin-top: 10rpx;
					height: 100%;
					width: 50%;
					color: #cde0ff;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					margin-right: 40rpx;
				}

			}

			.bottom-position {
				height: 50rpx;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				// margin: 30rpx;
				color: $uni-text-color-grey;

				>image {
					margin-right: 10rpx;
					height: 32rpx;
					width: 32rpx;
				}
			}
		}

	}
</style>
