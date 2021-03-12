<!-- 
Date: 
Author: liushuo
Description: 首页模块大按钮
 -->
<template>
	<view class="operate-item" @click="toPage">
		<!-- 提示小圆点 -->
		<view class="warn-circle" v-if="isWarning && number!=='0'"></view>
		<!-- icon -->
		<view class="item-img">
			<image :src="imgSrc"></image>
		</view>
		<view class="item-text">
			<!-- 审<text></text>批 -->
		{{text}}
		</view>
		<view class="item-number">
			{{number==='0'?'':number}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			imgSrc:{
				type:String,
				default:''
			},
			text:{
				type:String,
				default:''
			},
			number:{
				type:String,
				default:''
			},
			isWarning:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			toPage(){
				this.$emit('toPage')
			}
		}
	}
</script>

<style lang="scss">
	@mixin flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
.operate-item {
				width: 100%;
				height: 300rpx;
				background-color: #FFFFFF;
				box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
				border-radius: 60rpx;
				position: relative;
				
				.warn-circle{
					position: absolute;
					right: 40rpx;
					top:40rpx;
					width: 20rpx;
					height: 20rpx;
					border-radius: 50%;
					background-color: $uni-color-error;
				}
				.item-img{
					width: 100%;
					height: 150rpx;
					display: flex;
					justify-content: center;
					align-items: flex-end;
					
					>image{
						width: 100rpx;
						height: 100rpx;
					}
					// @include flex-center()
				}
				.item-text{
					width: 100%;
					height: 75rpx;
					font-size: 36rpx;
					letter-spacing: 5rpx;
					// 字间距
					>text{
						margin: 0 5rpx;
					}
					@include flex-center()
				}
				.item-number{
					width: 100%;
					height: 75rpx;
					font-size: 36rpx;
					font-weight: bold;
					color: $uni-color-primary;
					@include flex-center()
				}

				&:first-child {
					margin-right: 15rpx;
				}

				&:last-child {
					margin-left: 15rpx;
				}
			}
			
			.operate-item:active{
				box-shadow: 0px 0px 0px 0px;
				transform: 0.2s;
				opacity: 0.5;
			}
</style>
