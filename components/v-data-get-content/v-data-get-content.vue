<!-- 
	Date: 
	Author: liushuo
	Description: 数据采集内容卡片
 -->
<template>
	<view class="content-container" @click="cardEvent(obj)">
		<!-- 内容主体 -->
		<view class="content-item" v-for="(item,index) of obj.children" :key="index">
			<view class="item-left">{{item.title}}</view>
			<view class="item-right" :class="{'highLightText':item.isHighLight}">{{item.value}}</view>
		</view>
		<!-- 单选框 -->
		<view class="checkbox" :class="(isCheck)?'checkbox_active':''">
			<image src="../../static/img/yes-white.png" v-show="isCheck"></image>
		</view>
		<!-- 右上角数字角标 -->
		<view class="number-tag">1</view>
		<!-- 待开启 已采集标识 -->
		<view class="already_text" v-show="obj.isGet">
			已采集
		</view>
	</view>
</template>

<script>
	export default {
		name:'dataGetContent',
		props: {
			// 内容对象
			obj: {
				type: Object,
				default: null
			}
		},
		data() {
			return {
				isCheck: false
			};
		},
		methods: {
			// 卡片点击事件
			cardEvent(rowObj) {
				// checkBox切换
				let obj = {...rowObj}
				this.isCheck = !this.isCheck
				// 把选中id传出到父组件
				if (this.isCheck) {
					// 选中状态，传正整数id
					obj.id = rowObj.id
				} else {
					// 取消选中状态，传负数id
					obj.id = -1 * rowObj.id
				}
				this.$emit('changeCheck', obj)
			},
			// 清空checkbox打勾状态
			clearCheckBox(){
				this.isCheck = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content-container {
		width: 100%;
		padding: 10rpx 0 20rpx 0;
		position: relative;
		// height: 400rpx;
		// background-color: #007AFF;
		border-bottom: 1px solid $uni-bg-color-grey;

		.content-item {
			width: 100%;
			padding: 15rpx 20rpx;
			display: flex;

			.item-left {
				color: $uni-text-color-subtitle;
			}

			.item-right {
				color: $uni-text-color-title;
			}
		}

		.checkbox {
			border: 1px solid #dddddd;
			height: 60rpx;
			width: 60rpx;
			border-radius: 50%;
			position: absolute;
			bottom: 30rpx;
			right: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			>image {
				height: 30rpx;
				width: 30rpx;
			}
		}

		.number-tag {
			// 普通数字样式
			// width: 60rpx;
			// height: 60rpx;
			// border-radius: 50%;
			// display: flex;
			// justify-content: center;
			// align-items: center;
			// position: absolute;
			// color: $uni-color-primary;
			// top: 15rpx;
			// right: 30rpx;
			// font-size: 36rpx;
			// font-weight: bold;

			// 标签样式
			width: 60rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 5rpx 5rpx 10rpx #cccccc;
			border-radius: 0 0 30rpx 30rpx;
			background-color: $uni-color-primary;
			color: #FFFFFF;
			position: absolute;
			right: 30rpx;
			top: 0rpx;
		}

		.already_text {
			position: absolute;
			bottom: 40rpx;
			right: 120rpx;
			color: $uni-color-success;
		}

		.checkbox_active {
			border: 1px solid #dddddd;
			height: 60rpx;
			width: 60rpx;
			border-radius: 50%;
			position: absolute;
			bottom: 30rpx;
			right: 30rpx;
			background-color: $uni-color-success;
		}

		&:active {
			background-color: $uni-bg-color-grey;
		}
	}
	
	.highLightText{
		color: $uni-color-warn !important;
	}
</style>
