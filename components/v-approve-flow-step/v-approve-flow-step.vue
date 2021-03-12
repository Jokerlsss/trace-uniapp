<!-- 
Date: 
Author: liushuo
Description: 审批流程步骤条
 -->
<template>
	<view class="approve-flow-item" :style="{padding:padding}">
		<view class="left">
			<image :src="imgSrc"></image>
			<!-- <view class="step-line">
			</view> -->
		</view>
		<view class="right">
			<view class="right-top">
				<view class="right-top-left">
					<view class="top-user_name">{{approveFlowItem.eName}}</view>
					<view class="top-flow_name">{{approveFlowItem.approveResult}}</view>
				</view>
				<view class="top-flow_date">{{ykDateFormat('yyyy-MM-dd HH:mm:ss',approveFlowItem.approveTime)}}</view>
			</view>
			<!-- 审批意见 -->
			<view class="right-bottom">
				{{approveFlowItem.content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'v-approve-flow-step',
		props: {
			approveFlowItem: {
				type: Object,
				default: null
			},
			padding: {
				type: String,
				default: '30rpx 30rpx'
			}
		},
		computed: {
			imgSrc() {
				// 流程名为空-未审批图标
				if (this.approveFlowItem === null) {
					return require('../../static/img/approve-grey.png')
				}
				let result
				switch (this.approveFlowItem.approveResult) {
					case '待审批':
						result =  require('../../static/img/approve-grey.png')
						break
					case '发起':
						result = require('../../static/img/green-yes.png')
						break
					case '同意':
						result =  require('../../static/img/green-yes.png')
						break
					case '不同意':
						result =  require('../../static/img/red-error.png')
						break
					default:
						result =  require('../../static/img/green-yes.png')
						break
				}
				return result
			}
		},
		data() {
			return {};
		}
	}
</script>

<style lang="scss">
	.approve-flow-item {
		min-height: 150rpx;
		width: 100%;
		// padding: 0 30rpx;
		// margin: 30rpx 0;
		display: flex;
		border-bottom: 1px solid #f2f3f5;

		.left {
			height: 100%;
			width: 120rpx;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;

			>image {
				width: 70rpx;
				height: 70rpx;
				margin: 0 10rpx;
			}
		}

		.right {
			height: 100%;
			width: 100%;

			.right-top {
				height: 50%;
				width: 100%;
				display: flex;
				align-items: flex-end;
				padding-bottom: 5rpx;
				// justify-content: space-around;

				// 角色 + 流程名称
				.right-top-left {
					width: 50%;
					display: flex;

					.top-user_name {
						// padding-left: 10rpx;
						margin: 0 10rpx;
						// width: 25%;
						color: #999999;
					}

					.top-flow_name {
						color: $uni-text-color-title;
						// width: 25%;
					}
				}

				// 日期
				.top-flow_date {
					text-align: right;
					width: 60%;
					color: $uni-text-color-sub2title;
				}
			}

			// 审批意见
			.right-bottom {
				padding-top: 5rpx;
				height: 50%;
				width: 100%;
				margin: 0 10rpx;
				color: #666666;
			}
		}
	}
</style>
