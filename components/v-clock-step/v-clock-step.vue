<!-- 
Date: 
Author: liushuo
Description: 打卡记录步骤条
 -->
<template>
	<view class="step-container">
		<view class="left">
			<view class="left-top">
					<image :src="circleImg"></image>
			</view>
			<view class="left-bottom">
				<view class="line" v-if="isLine">
					
				</view>
			</view>
		</view>
		<view class="right">
			<view class="right-top">
				{{title}} {{clockTime}}
				<view :class="isClockSuccess?'clock-status-success':'clock-status-fail'" v-if="isClock">
					<!-- {{isClockSuccess?'打卡成功':('未打卡' || '打卡失败')}} -->
					{{isClockSuccess?'打卡成功':'未打卡'}}
				</view>
			</view>
			<view class="right-bottom">
				<image src="../../static/img/position-grey.png"></image>
				{{isClockSuccess?'高新区海西园':'无记录'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isLine:{
				type:Boolean,
				default:true
			},
			isClockSuccess:{
				type:Boolean,
				default:false
			},
			isClock:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:'上班打卡'
			},
			clockTime:{
				type:String,
				default:'00:00'
			}
		},
		computed:{
			circleImg(){
				// 未打卡
				if(!this.isClock){
					return require("../../static/img/circle.png")
				}
				// 打卡成功
				else if(this.isClock && this.isClockSuccess){
					return require("../../static/img/clock-success.png")
				}
				// 打卡失败
				else if(this.isClock && !this.isClockSuccess){
					return require("../../static/img/clock-fail.png")
				}
			},
			lineClass(){
				if(!this.isClock){
					return 'line'
				}
				// 打卡成功
				else if(this.isClock && this.isClockSuccess){
					return 'line-success'
				}
				// 打卡失败
				else if(this.isClock && !this.isClockSuccess){
					return 'line-fail'
				}
			}
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss">
	// position-clock 的 middle 高度为: 770rpx
	$container-height:180rpx;
	$container-top-height:40rpx;
	$container-bottom-height:140rpx;
	$container-margin:10rpx;
	
	$clock-success-color:#00b290;
	$clock-fail-color:#f16a6d;

	.step-container {
		width: 100%;
		height: $container-height;
		// background-color: #007AFF;
		display: flex;

		.left {
			width: 40rpx;
			height: $container-height;

			.left-top {
				width: 100%;
				height: $container-top-height;
				display: flex;
				align-items: center;
				justify-content: center;
				
					>image{
						width: 32rpx;
						height: 32rpx;
					}
			}

			.left-bottom {
				height: $container-bottom-height;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				
				// 步骤线条
				.line{
					height: $container-bottom-height;
					width: 4rpx;
					background-color: #cccccc;
				}
				
				.line-success{
					height: $container-bottom-height;
					width: 4rpx;
					background-color: $clock-success-color;
				}
				
				.line-fail{
					height: $container-bottom-height;
					width: 4rpx;
					background-color: $clock-fail-color;
				}
			}
		}

		.right {
			width: 95%;
			height: $container-height;
			
			.right-top{
				font-size: 34rpx;
				font-weight: 500;
				height: $container-top-height;
				display: flex;
				align-items: center;
				margin-left: 10rpx;
				
				// 打卡是否成功的状态标签
				.clock-status-success{
					padding: 0 10rpx;
					margin: 0 20rpx;
					border: 1px solid $clock-success-color;
					border-radius: 30rpx;
					color: $clock-success-color;
					font-size: 24rpx;
				}
				
				.clock-status-fail{
					padding: 0 10rpx;
					margin: 0 20rpx;
					border: 1px solid $clock-fail-color;
					border-radius: 30rpx;
					color: $clock-fail-color;
					font-size: 24rpx;
				}
			}
			
			.right-bottom{
				// font-size: 24rpx;
				height: $container-bottom-height;
				color: $uni-text-color-grey;
				margin-left: 10rpx;
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				padding-bottom: 70rpx;
				
				>image{
					margin-right: 10rpx;
					height: 28rpx;
					width: 28rpx;
				}
			}
		}
	}
</style>
