<!-- 
	Date: 
	Author: liushuo
	Description: 底部按钮组件，如保存、开始维修等
-->
<template>
	<view>
		<button class="save-btn" @click="submit" :style="{
			'background-color': bgColor,
			'color':color,
			'border-top':'1px solid '+borderTopColor
			}">{{text}}</button>
	</view>
</template>

<script>
	export default {
		props:{
			// 文本
			text:{
				type:String,
				default:'提交'
			},
			// 背景色
			bgColor:{
				type:String,
				default:'#6c9eff'
			},
			// 文本颜色
			color:{
				type:String,
				default:'#ffffff'
			},
			// 上边框颜色
			borderTopColor:{
				type:String,
				default:'none'
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			submit(){
				this.$emit('btnClick')
			}
		}
	}
</script>

<style lang="scss">
.save-btn {
		height: $bottomBtnHeight;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 999;
		color: #FFFFFF;
		font-size: 40rpx;
		font-weight: 600;
		border-radius: 0;
		display: flex;
		align-items: center;
		justify-content: center;

		&::after {
			border: none;
		}

		&:active {
			opacity: 0.7;
		}
	}
</style>
