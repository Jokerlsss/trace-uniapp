<!-- 
Date: 
Author: liushuo
Description: 图标+文字
 -->
<template>
	<view class="container" @click="toForm">
		<view class="img">
			<image :src="imgSrc"></image>
		</view>
		<view class="text">
			{{title}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "form_menu",
		props: {
			url:{
				type:String,
				default:''
			},
			imgSrc:{
				type:String,
				default:''
			},
			title:{
				type:String,
				default:''
			}
		},
		data() {
			return {

			}
		},
		methods: {
			toForm() {
				uni.navigateTo({
					url: this.url
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		// background-color: #007AFF;
		// margin: 0 30rpx;
		width: 200rpx;
		height: 130rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 40rpx;

		.img {
			// background-color: red;
			height: 96rpx;
			width: 96rpx;

			>image {
				width: 96rpx;
				height: 96rpx;
			}
		}

		.text {
			// background-color: yellow;
			text-align: center;
			font-size: 28rpx;
			color: #666666;
		}
	}
</style>
