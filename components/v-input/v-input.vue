<!-- 
Date: 
Author: liushuo
Description: 自定义input带clearable按钮（点击后不会收起键盘）
 -->
<template>
	<view class="container">
		<u-input v-model="userName" type="text" class="input" :height="100" placeholder="用户名2" :custom-style="customStyle"
		 :clearable="false" @focus="unfocus" @blur="unblur" />
		<view class="clear" @click="clearInput('userName')" v-if="isUserName">
			<image src="../../static/img/clear.png" class="img"></image>
		</view>
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
	.container {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-end;
		border-bottom: 1px solid #e4e4e4;

		.clear {
			margin-bottom: 20rpx;

			.img {
				height: 36rpx;
				width: 36rpx;
			}
		}
	}
</style>
