<template>
	<view>
		<button @click="uploadEntity">上传entity标识</button>
		<!-- <button @click="getLocation">获取位置</button> -->
		<button @click="getLocation">采集轨迹点</button>
		<button @click="selectTrace">查询轨迹</button>
		<view v-for="(item,index) of traceList" :key="index">
			经度：{{item.longitude}}
			纬度：{{item.latitude}}
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ak:'l1WUw1juyEu8hYrgxrWVnrObA9N1Lh77',
				service_id:226495,
				// 当前上传成功的entity
				current_entity:'liushuo',
				latitude:'',
				longitude:'',
				// 现在时间
				nowDate:new Date().getTime().toString().substr(0,10),
				startTime:(new Date().getTime()-86400000).toString().substr(0,10),
				endTime: new Date().getTime().toString().substr(0,10),
				// 轨迹点列表
				traceList:[]
			};
		},
		methods:{
			// 上传entity标识
			async uploadEntity(){
				let entity = {
					ak:this.ak,
					service_id:this.service_id,
					entity_name:'liushuo'
				}
				const res = await this.$http.request({
				  url: '/entity/add',
				  method: 'post',
				  data: entity
				})
				if (res.data.status!==0) {
				  this.$refs.uToast.show({
				    title: res.data.message,
				    type: 'error'
				  })
				  return false
				}
				this.$refs.uToast.show({
				  title: '上传entity'+res.data.message,
				  type: 'success'
				})
				// 赋值entity
				this.current_entity = eneity.entity_name
			},
			
			// 采集轨迹点
			async uploadTrace(){
				// 获取当前位置
				let traceObj = {
					ak:this.ak,
					service_id:this.service_id,
					entity_name:this.current_entity,
					latitude:this.latitude,
					longitude:this.longitude,
					// loc_time为10位时间戳
					loc_time:this.nowDate,
					coord_type_input:'wgs84'
				}
				const res = await this.$http.request({
				  url: '/track/addpoint',
				  method: 'post',
				  data: traceObj
				})
				if (res.data.status!==0) {
				  this.$refs.uToast.show({
				    title: res.data.message,
				    type: 'error'
				  })
				  return
				}
				this.$refs.uToast.show({
				  title: '采集'+res.data.message,
				  type: 'success'
				})
			},
			
			// 轨迹查询
			async selectTrace(){
				let selectObj = {
					ak:this.ak,
					service_id:this.service_id,
					entity_name:this.current_entity,
					start_time:this.startTime,
					end_time:this.endTime
				}
				const res = await this.$http.request({
				  url: '/track/gettrack',
				  method: 'get',
				  data: selectObj
				})
				if (res.data.status!==0) {
				  this.$refs.uToast.show({
				    title: res.data.message,
				    type: 'error'
				  })
				  return false
				}
				this.$refs.uToast.show({
				  title: '查询成功',
				  type: 'success'
				})
				this.traceList = res.data.points
			},
			
			// 获取当前位置
			getLocation() {
				let that = this
				uni.getLocation({
					type: 'wgs84',
					geocode: 'true',
					success: (res) => {
						this.handleGetLocationSuccess(res)
					},
					fail: (err) => {
						this.$refs.uToast.show({
						  title: '位置获取失败',
						  type: 'error'
						})
					}
				});
			},
			// 获取位置成功事件处理
			handleGetLocationSuccess(res) {
				if (!res.address) {
					return
				}
				this.latitude = res.latitude
				this.longitude = res.longitude
				
				// this.$refs.uToast.show({
				//   title: '位置获取成功',
				//   type: 'success'
				// })
				
				// 上传轨迹点
				this.uploadTrace()
			}
		}
	}
</script>

<style lang="scss">

</style>
