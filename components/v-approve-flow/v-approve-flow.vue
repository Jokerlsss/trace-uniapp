<template>
	<view>
		<v-approve-flow-step v-for="(item,index) of approveFlowList" :key="index" :approveFlowItem="item" :padding="padding">
		</v-approve-flow-step>
	</view>
</template>

<script>
	export default {
		props: {
			approveFlowList: {
				type: Array,
				default: null
			},
			// 内边距
			padding:{
				type:String,
				default:'0 60rpx'
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>
