<template>
	<!-- 空数据 -->
	<view class="nullData">
		<image class="nullDataImg" src="../../static/img/null-data.png"></image>
		<view class="text">暂无数据</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.nullData {
		width: 100%;
		height: 750rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		flex-wrap: wrap;

		image {
			width: 400rpx;
			height: 262rpx;
		}

		.text {
			text-align: center;
			width: 100%;
			color: rgba(191, 191, 191, 100);
			margin-top: 20rpx;
			font-size: 30rpx;
			font-family: PingFangSC-bold;
		}
	}
</style>
