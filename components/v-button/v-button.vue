<!-- 
Date: 
Author: liushuo
Description: 新增single页面的按钮
 -->
<template>
	<view class="container" @click="showPopup">
			<image :src="imgSrc"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc:"../../static/img/add-btn.png"
			};
		},
		methods:{
			showPopup(){
				this.$emit('showPopup')
			}
		}
	}
</script>

<style lang="scss">
	.container{
		width: 100rpx;
		height: 100rpx;
		position: fixed;
		right: 30rpx;
		bottom: 30rpx;
		opacity: 0.6;
		z-index: 999;
		border-radius: 50%;
		
		>image{
			width: 100rpx;
			height: 100rpx;
		}
	}
	
	.container:active{
		opacity: 1;
	}
</style>
