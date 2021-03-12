<!-- 
Date: 
Author: liushuo
Description: 打卡记录步骤条-横向
 -->
<template>
	<view class="container">
		<view class="step-container" v-for="(stepItem,index) of stepList" :key="index">
			<view class="left">
				<image :src="stepItem.imgSrc"></image>
			</view>
			<view class="right" v-if="stepItem.isShowLine">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 图片路径
				clockSuccessImg:require("../../static/img/yes.png"),
				clockFailImg:require("../../static/img/main-clock-fail.png"),
				clockNoneImg:require("../../static/img/yes-grey.png"),
				
				stepList: [
					{
						isShowLine:true,
						imgSrc:require("../../static/img/yes.png")
					},
					{
						isShowLine:true,
						imgSrc:require("../../static/img/yes.png")
					},
					{
						isShowLine:true,
						imgSrc:require("../../static/img/main-clock-fail.png")
					},
					{
						isShowLine:false,
						imgSrc:require("../../static/img/yes-grey.png")
					}
				]
			};
		}
	}
</script>

<style lang="scss">
	.container{
		display: flex;
	}
	.step-container {
		display: flex;
		align-items: center;

		.left {
			width: 32rpx;
			display: flex;
			align-items: center;

			>image {
				width: 32rpx;
				height: 32rpx;
				opacity: 0.8;
			}
		}

		.right {
			width: 60rpx;
			height: 6rpx;
			background-color: #c0c0c0;
			margin-left: 10rpx;
			margin-right: 10rpx;
		}
	}
</style>
