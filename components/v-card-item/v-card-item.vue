<!-- 
Date: 
Author: liushuo
Description: 审批菜单卡片
 -->
<template>
	<view class="listItems">
		<view class="listTop">
			<view class="titleText">{{ item.alText || cardHeader }}</view>
			<view class="dateText">{{ ykDateFormat('yyyy-MM-dd HH:mm', item.applyDate) || ykDateFormat('yyyy-MM-dd HH:mm', item.writeDate) }}</view>
		</view>
		<view class="listMiddle" @click="approveItemClick">
			<!-- 动态展示内容 -->
			<view class="listMessage" v-for="(childItem, index) of Object.keys(cardTitle)" :key="index">
			{{ cardTitle[childItem] }}：
			<text style="color:#666666">{{ item[childItem] }}</text>
			</view>
		</view>
		<view class="listFooter">
			<view class="footerName">
				<image src="../../static/img/icon/form-list-user.png"></image>
				由{{ item.applyMan || item.writer }}提交
			</view>
			<!-- 右下角审批流程按钮 -->
			<view class="footButtonClass" v-if="isShowPendingBtn && isApprove" @click="openApproveFlow">审批流程</view>

			<!-- 审批状态 -->
			<view :class="statusStyle(item.approveState)" v-else-if="effectIsApprove && item.approveState">
				{{item.approveState}}</view>

			<!-- 自定义显示状态 -->
			<view :class="statusStyle(item.customValue)" v-else-if="customState">
				{{item.customValue}}</view>
		</view>
		<!-- 审批操作按钮 -->
		<view class="list-bottom" v-if="isApprove">
			<!-- 待审批的按钮 -->
			<button type="default" class="left-btn" v-if="isShowPendingBtn" @click="operateEvent('不同意')">
				不同意
			</button>
			<button type="default" class="middle-btn" v-if="isShowPendingBtn" @click="operateEvent('保留意见')">
				保留意见
			</button>
			<button type="default" class="right-btn" v-if="isShowPendingBtn" @click="operateEvent('同意')">
				同意
			</button>
			<!-- 已审批的按钮 -->
			<button type="default" class="left-btn" v-if="!isShowPendingBtn" @click="operateEvent('撤销')">
				撤销
			</button>
			<button type="default" class="right-btn-grey" v-if="!isShowPendingBtn" @click="openApproveFlow">
				审批流程
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 传入的审批数据对象
			item: {
				type: Object,
				default: null
			},
			// 审批状态（用于更换底部按钮控件，如撤销按钮）
			approveStatus: {
				type: String,
				// pending & approved: 待审批 & 已审批
				default: 'pending'
			},
			// 是否显示卡片审批操作菜单
			isApprove: {
				type: Boolean,
				default: false
			},
			// 生效条件为审批
			effectIsApprove: {
				type: Boolean,
				default: false
			},
			// 卡片标题文字
			cardHeader: {
				type: String,
				default: ''
			},
			// 卡片内容的标题
			cardTitle: {
				type: Object,
				default: null
			},
			// 是否右下角自定义状态
			customState: {
				type: Boolean,
				default: false
			}
		},
		onReady() {},
		computed: {
			// 是否显示待审批的控件
			// 若是则显示同意、不同意、保留意见等按钮，若否则显示撤销、审批流程按钮
			isShowPendingBtn() {
				let flag = true
				switch (this.approveStatus) {
					case 'pending':
						flag = true
						break
					case 'approved':
						flag = false
						break
					case 'myApply':
						flag = false
						break
				}
				return flag
			}
		},
		mounted() {

		},
		data() {
			return {
				rules: {
					opinion: [{
						// 点击的为保留意见时意见必填
						required: true,
						message: '请填写审批意见',
						trigger: ['change', 'blur'],
					}]
				}
			};
		},
		methods: {
			// 打开审批流程
			openApproveFlow() {
				this.$emit('openApproveFlow', this.item.keyValue, this.item.vuePath)
			},
			// 打开对应单据详情页
			approveItemClick() {
				this.$emit('click', this.item.keyValue, this.item.vuePath)
			},
			// 打开审批意见弹窗
			operateEvent(value) {
				this.$emit('openApproveModal', value, this.item.keyValue, this.item.vuePath)
			},
			statusStyle(value) {
				switch (value) {
					case '审批中':
						return 'statusWarn'
					case '已通过':
						return 'statusSuccess'
					case '不同意':
						return 'statusError'
						// 未核销
					case '未核实':
						return 'statusWarn'
						// 已核销
					case '已核实':
						return 'statusSuccess'
					default:
						return 'statusGrey'
				}
			}
		}
	}
</script>

<style lang="scss">
	@mixin bottom-btn-style($bgcolor, $textcolor, $fontsize) {
		width: 100%;
		background-color: $bgcolor;
		font-size: $fontsize;
		line-height: 70rpx;
		color: $textcolor;
		height: 70rpx;
		margin: 0 10rpx;

		&:active {
			transform: 0.2s;
			opacity: 0.5;
		}

		&::after {
			border: none;
		}
	}

	.listItems {
		margin: 13rpx 0;
		width: 90%;
		height: auto;
		background: #ffffff;
		border-radius: 20rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		// align-content: center;

		.listTop {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 90%;
			height: 70rpx;
			// height: 50rpx;
			margin-top: 10rpx;

			.titleText {
				color: rgba(16, 16, 16, 100);

				font: {
					size: 34rpx;
					weight: bold;
					family: PingFangSC-regular;
				}
			}

			.dateText {
				color: rgba(192, 192, 192, 100);

				font: {
					size: 24rpx;
					family: PingFangSC-regular;
				}
			}
		}

		.listMiddle {
			display: flex;
			flex-wrap: wrap;
			width: 90%;

			.listMessage {
				width: 100%;
				color: rgba(153, 153, 153, 100);
				font-size: 28rpx;
				font-family: PingFangSC-regular;
				margin: 10rpx 0;
			}
		}

		.listFooter {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			width: 90%;
			// margin-top: 10rpx;

			.footerName {
				display: flex;
				align-items: center;
				color: rgba(16, 16, 16, 100);
				font-size: 28rpx;
				font-family: PingFangSC-regular;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}

			.footButtonClass {
				border-radius: 10rpx;
				border: 1px solid #cccccc;
				color: #aaaaaa;
				padding: 5rpx 20rpx;

				&:active {
					color: #ffffff;
					background-color: #999999;
				}
			}
		}

		.list-bottom {
			height: 80rpx;
			margin-top: 20rpx;
			width: 100%;
			display: flex;

			.left-btn {
				border-radius: 20rpx;

				&:active {
					background-color: #ff6f6f;
					color: #ffffff;
				}

				@include bottom-btn-style(#ffffff, #ff6f6f, 28rpx);
			}

			.middle-btn {
				border-radius: 20rpx;
				@include bottom-btn-style(#f2f3f5, #888888, 28rpx);
			}

			.right-btn {
				border-radius: 20rpx;

				&:active {
					background-color: #70ce8b;
					color: #ffffff;
				}

				@include bottom-btn-style(#ffffff, #70ce8b, 30rpx);
			}

			.right-btn-grey {
				border-radius: 20rpx;
				@include bottom-btn-style(#dddddd, #666666, 30rpx);
			}
		}
	}

	.statusWarn {
		color: $uni-color-warn !important;
		// border: 1px solid $uni-color-warn !important;
	}

	.statusSuccess {
		color: $uni-color-success !important;
		// border: 1px solid $uni-color-success !important;
	}

	.statusError {
		color: $uni-color-error !important;
		// border: 1px solid $uni-color-error !important;
	}

	.statusGrey {
		color: $uni-text-color-subtitle !important;
		// border: 1px solid $uni-text-color-sub2title !important;
	}
</style>
