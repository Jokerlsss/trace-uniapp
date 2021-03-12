<template>
	<view>
		<YKTable>
			<YKTr>
				<YKTh v-for="(item, index) of colsList" :key="index" :width="item.width ? item.width : '100rpx'">{{item.title}}</YKTh>
				<!-- <YKTh v-for="(item, index) of colsList" :key="index">{{item.title}}</YKTh> -->
			</YKTr>
			<YKTr v-for="(tr, index) of tableData.tr" :key="index">
				<YKTd v-for="(td, index) of tableData.td[tr]" :width="td.width ? td.width : '100rpx'">{{td.value}}</YKTd>
				<!-- <YKTd v-for="(td, index) of tableData.td[tr]">{{td.value}}</YKTd> -->
			</YKTr>
		</YKTable>
	</view>
</template>

<script>
	import YKTable from './components/u-table/u-table'
	import YKTr from './components/u-tr/u-tr'
	import YKTh from './components/u-th/u-th'
	import YKTd from './components/u-td/u-td'
	export default {
		name: 'vs-table',
		props: {
			colsList: {
				type: Array,
				default: () => {
					return []
				}
			},
			rowsList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		created() {
			this.initCol()
			this.$nextTick(() => {
				this.againStyle()
			})
		},
		components: {
			YKTable,
			YKTr,
			YKTh,
			YKTd
		},
		data() {
			return {
				tableData: {
					tr: [],
					td: []
				}
			}
		},
		methods: {
			// 初始化列
			initCol() {
				this.tableData = {
					tr: [],
					td: []
				}
				let i = 0
				for (let row of this.rowsList) {
					this.tableData.tr.push(i)
					i += 1
					let Arr = []
					for (let col of this.colsList) {
						if (row[col.fixed] !== '') {
							let cacheTd = {
								width: col.width,
								fixed: col.fixed,
								title: col.title,
								value: row[col.fixed]
							}
							Arr.push(cacheTd)
						} else {
							let cacheTd = {
								width: col.width,
								fixed: col.fixed,
								title: col.title,
								value: row[col.fixed]
							}
							Arr.push(cacheTd)
						}
					}
					this.tableData.td.push(Arr)
				}
				// console.log(this.tableData)
			},
			// 复检列样式
			againStyle() {}
			// 获取字符串长度
			// getStrLenght(str) => {
			// 	let len = 0;
			// 	for (let i = 0; i < str.length; i++) {
			// 		let c = str.charCodeAt(i);
			// 		if (c > 255) {
			// 			len += 2;
			// 		} else {
			// 			len += 1;
			// 		}
			// 	}
			// 	return len;
			// }
		}
	}
</script>

<style lang="scss">
</style>
