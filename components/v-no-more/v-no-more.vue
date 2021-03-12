<!-- 
Date: 
Author: liushuo
Description: 底部 "没有更多了"
 -->
<template>
	<view class="container">
		{{content}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:"~没有更多了~"
			};
		}
	}
</script>

<style lang="scss">
.container{
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	font-size: 30rpx;
	color: #dddddd;
}
</style>
