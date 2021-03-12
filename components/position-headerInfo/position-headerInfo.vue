<template>
	<view class="info">
		<view class="info-left">
			<view class="info-left-top">
				{{name}}
			</view>
			<view class="info-left-bottom">
				<image :src="address==='获取定位失败'?warningIcon:addressIcon"></image>
				{{address}}
			</view>
		</view>
		<view class="info-right">
			<view class="info-right-top">
				<image src="../../static/img/oath.png"></image>
			</view>
			<view class="info-right-bottom">
				申请
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				default: ''
			},
			address: {
				type: String,
				default: '获取定位失败'
			}
		},
		data() {
			return {
				addressIcon: require('../../static/img/position-blue.png'),
				warningIcon: require('../../static/img/warning.png')
			}
		}
	}
</script>

<style lang="scss">
	%container-common {
		border-radius: 30rpx;
		background-color: #fff;
		// box-shadow: 0rpx 5rpx 20rpx #d7d7d7;
	}

	.info {
		@extend %container-common;
		width: 100%;
		height: 100%;
		display: flex;

		.info-left {
			width: 80%;
			height: 100%;

			.info-left-top {
				width: 100%;
				height: 60%;
				margin-left: 40rpx;

				font-size: 36rpx;
				font-weight: 600;
				display: flex;
				align-items: center;
			}

			.info-left-bottom {
				width: 100%;
				height: 40%;
				margin-left: 40rpx;

				display: flex;
				color: $uni-text-color-grey;

				>image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
			}
		}

		.info-right {
			width: 20%;
			height: 100%;

			.info-right-top {
				width: 100%;
				height: 60%;
				display: flex;
				justify-content: center;
				align-items: flex-end;

				>image {
					width: 56rpx;
					height: 56rpx;
				}
			}

			.info-right-bottom {
				width: 100%;
				height: 40%;
				display: flex;
				justify-content: center;
				font-size: 24rpx;
				color: $uni-text-color-grey;
			}
		}
	}
</style>
