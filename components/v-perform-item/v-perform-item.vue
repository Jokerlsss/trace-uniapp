<template>
	<view class="container" @click="toPerformDetail">
		<!-- 头部标题 -->
		<view class="top">
			<view class="top-left">
				{{title}}
			</view>
			<view class="top-right">
				{{dateTime}}
			</view>
		</view>
		<!-- 底部描述 -->
		<view class="bottom">
			<!-- 限制字数，多余省略 -->
			{{description}}
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:''
			},
			dateTime:{
				type:String,
				default:''
			},
			description:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			toPerformDetail(){
				this.$emit('toPerformDetail')
			}
		}
	}
</script>

<style lang="scss">
.container{
	background-color: #fff;
	height: 140rpx;
	width: 100%;
	color: $uni-text-color-title;
	padding: 10rpx 0;
	// margin-bottom：底部分割线
	margin-bottom: 2rpx;
	
	.top{
		height: 70rpx;
		width: 100%;
		display: flex;
		
		// 左部标题
		.top-left{
			width:60%;
			height: 100%;
			font-size: 32rpx;
			display: flex;
			align-items: center;
			padding-left: 30rpx;
		}
		
		// 右部时间
		.top-right{
			width: 40%;
			height: 100%;
			color: $uni-text-color-sub2title;
			@include flex-center()
		}
	}
	
	// 底部描述
	.bottom{
		height: 50rpx;
		width:100%;
		padding-left: 30rpx;
		color: $uni-text-color-subtitle;
	}
	
	&:active{
		@include btn-active-5
	}
}
</style>
