<template>
	<view class="equiment_card" @click="clickEvent">
		<view class="top">
			<view class="top-left">
				{{dataObj.bxTime}}
			</view>
			<view class="top-right" :class="statusStyle(dataObj.status)">
				{{dataObj.status}}
			</view>
		</view>
		<view class="bottom">
			<view class="bottom-item">
				<view class="item-single">
					<text class="label">维修类型：</text>{{dataObj.fixedType}}
				</view>
				<view class="item-single">
					<text class="label">维修单号：</text>{{dataObj.formNum}}
				</view>
			</view>
			<view class="bottom-item">
				<view class="item-single">
					<text class="label">申请人：</text>{{dataObj.bxMan}}
				</view>
				<view class="item-single">
					<text class="label">申请日期：</text>{{dataObj.bxTime}}
				</view>
			</view>
			<view class="bottom-item">
				<view class="item-single">
					<text class="label">器具名称：</text>{{dataObj.name}}
				</view>
				<view class="item-single">
					<text class="label">规格型号：</text>{{dataObj.spec}}
				</view>
			</view>
			<view class="bottom-item">
				<view class="item-single">
					<text class="label">器具编号：</text>{{dataObj.num}}
				</view>
				<view class="item-single">
					<text class="label">紧急程度：</text>
					<text :class="typeStyle(dataObj.emergency)">{{dataObj.emergency}}</text>
				</view>
			</view>
			<view class="bottom-item">
				<text class="label">故障描述：</text>{{dataObj.description}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		// name:'v-equiment-card-jc',
		props: {
			dataObj: {
				type: Object,
				default: null,
			}
		},
		data() {
			return {
				status: '未分配'
			};
		},
		methods: {
			// 状态根据颜色改变
			statusStyle(state) {
				let flag = ''
				switch (state) {
					case '未分配':
						flag = 'statusPrimary'
						break
					case '未开始':
						flag = 'statusError'
						break
					case '维修中':
						flag = 'statusWarn'
						break
					case '维修完毕':
						flag = 'statusSuccess'
						break
				}
				return flag
			},
			typeStyle(state) {
				let flag = ''
				switch (state) {
					case '紧急':
						flag = 'statusError'
						break
				}
				return flag
			},
			clickEvent() {
				if (!this.dataObj.status) {
					return
				}
				// 把当前状态抛到父组件中
				this.$emit('clickEvent', this.dataObj.status,this.dataObj.id)
			}
		}
	}
</script>

<style lang="scss">
	.equiment_card {
		width: 100%;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		// border-radius: 20rpx;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 10rpx 0 20rpx 0;
		position: relative;
		font-size: 26rpx;

		.top {
			width: 90%;
			height: 60rpx;
			display: flex;

			.top-left {
				height: 100%;
				width: 75%;
				display: flex;
				align-items: center;
				font-size: 32rpx;
				font-weight: 600;
			}

			.top-right {
				height: 100%;
				width: 25%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}

		.bottom {
			width: 90%;

			.bottom-item {
				margin: 20rpx 0;
				display: flex;
				flex-wrap: wrap;

				.item-single {
					width: 50%;

					.label {
						color: #999999;
					}
				}

				>text {
					color: #999999;
				}
			}
		}
	}
	
	.statusPrimary {
		color: $uni-text-color-subtitle;
	}
	
	.statusError {
		color: $uni-color-error
	}
	
	.statusWarn {
		color: $uni-color-warn
	}
	
	.statusSuccess {
		color: $uni-color-success
	}
</style>
