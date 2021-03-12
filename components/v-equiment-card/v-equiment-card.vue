<template>
	<view class="equiment_card" @click="clickEvent">
		<view class="top">
			<view class="top-left">
				{{ykDateFormat('yyyy-MM-dd',dataObj.reportTime)}}
			</view>
			<view class="top-right" :class="statusStyle(dataObj.mState)">
				{{dataObj.mState}}
			</view>
		</view>
		<view class="bottom">
			<view class="bottom-item">
				<view class="item-single">
					<text class="label">单据类型：</text>{{dataObj.type}}
				</view>
				<view class="item-single">
					<text class="label">单据编号：</text>{{dataObj.num}}
				</view>
			</view>
			<view class="bottom-item">
				<view class="item-single">
					<text class="label">报修人：</text>{{dataObj.person}}
				</view>
				<view class="item-single">
					<text class="label">报修时间：</text>{{ykDateFormat('yyyy-MM-dd',dataObj.reportTime)}}
				</view>
			</view>
			<view class="bottom-item">
				<view class="item-single">
					<text class="label">{{flag==='SB'?'设备名称：':'模具名称：'}}</text>{{dataObj.deviceName || dataObj.moldName}}
				</view>
				<view class="item-single">
					<text class="label">规格型号：</text>{{dataObj.deviceSpec || dataObj.moldSpec}}
				</view>
			</view>
			<view class="bottom-item">
				<view class="item-single">
					<text class="label">{{flag==='SB'?'设备编号：':'模具编号：'}}</text>{{dataObj.deviceNum || dataObj.moldNum}}
				</view>
				<view class="item-single">
					<text class="label">报修类型：</text>
					<text :class="typeStyle(dataObj.repairType)">{{dataObj.repairType}}</text>
				</view>
			</view>
			<view class="bottom-item">
				<view class="item-single">
					<text class="label">维修单位：</text>{{dataObj.repairUnit}}
				</view>
				<view class="item-single">
					<text class="label">维修人：</text>{{dataObj.repairPerson}}
				</view>
			</view>
			<view class="bottom-item">
				<text class="label">故障描述：</text>{{dataObj.faultDescription}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataObj: {
				type: Object,
				default: null,
			},
			flag:{
				type:String,
				// 默认为 'SB'设备；可选值 'MJ'/'SB'
				default:'SB'
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
						flag = 'statusError'
						break
					case '未开始':
						flag = 'statusError'
						break
					case '维修中':
						flag = 'statusPrimary'
						break
					case '维修完毕':
						flag = 'statusWarn'
						break
					case '已验收':
						flag = 'statusBlue'
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
				if (!this.dataObj.mState) {
					return
				}
				// 把当前状态抛到父组件中
				this.$emit('clickEvent', this.dataObj.mState, this.dataObj.id)
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
	
	.statusBlue {
		color: $uni-color-primary
	}
</style>
