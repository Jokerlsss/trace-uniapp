<!-- 
	Date: 2021-01-17
	Author: liushuo
	Description: 表格控件
 -->
<template>
	<view class="container">
		<view class="table-scroll-view" :style="{
			width: width,
			height: height,
		}">
			<!-- 表头 -->
			<view class="header" :style="{borderBottom: '1px solid' + borderColor}">
				<view class="header-item" v-for="(item,index) of headers" :key="item.key" :style="{
					minWidth: (item.width || defaultColWidth) + 'rpx',
					maxWidth: (item.width || defaultColWidth) + 'rpx',
					minHeight:  headHeight + 'rpx',
					'justify-content':align,
					zIndex: index ===0 ? 35: 30,
					borderTop:'1px solid'+borderColor,
					borderRight: index === headers.length - 1 ? 'none':'1px solid' + borderColor,
					backgroundColor: headerBgColor,
					left: index === 0 && firstLineFixed ? 0 : 'auto',
					position: index === 0 ? 'sticky' : 'static'
				}">
					{{item.label}}
				</view>
			</view>
			<!-- 表格内容 -->
			<view class="content">
				<!-- 行 -->
				<view @click="rowClick(rowIndex)" class="row" :class="{
					'lightRow':isLight(rowIndex)
					}"
				 v-for="(rowItem,rowIndex) of tableDataSort" :key="contentLineKey(rowItem,rowIndex)" :style="{
					 borderTop: rowIndex === 0 ? 'none' : '1px solid' + borderColor
					 }">
					<!-- 列 -->
					<view class="col" :class="{'clickLightRow':isRowClick(rowIndex)}" v-for="(header,hIndex) of headers" :key="contentItemKey(header, hIndex)" :style="{
					 minWidth: (header.width || defaultColWidth) + 'rpx',
					 maxWidth: (header.width || defaultColWidth) + 'rpx',
					 minHeight: contentHeight + 'rpx',
					 backgroundColor:isLight(rowIndex)?'#f2f3f5':itemBgColor,
					 'justify-content':align,
					 borderBottom: rowIndex === rowItem.length - 1 ? ('1px solid' + borderColor) : 'none',
					 borderRight: hIndex === headers.length - 1 ? 'none' : '1px solid' + borderColor,
					 zIndex: hIndex === 0 ? 20 : 0,
					 left: 0,
					 position: hIndex === 0 && firstLineFixed ? 'sticky' : 'static'
				 }">
						{{autoContentItem(rowIndex,hIndex)}}
					</view>
				</view>
				<!-- 合计 -->
				<view v-if="computedCol.length !== 0" class="row" :style="{
					position: bottomComputedFixed ? 'sticky' : 'static',
					bottom: 0,
					zIndex: 25,
					borderTop: '1px solid' + borderColor}">
					<view class="col" v-for="(header, index) in headers" :key="index" :style="{
						 minWidth: (header.width || defaultColWidth) + 'rpx',
						 maxWidth: (header.width || defaultColWidth) + 'rpx',
						 minHeight: contentHeight + 'rpx',
						 'justify-content':align,
						 backgroundColor: itemBgColor,
						 borderBottom: '1px solid' + borderColor,
						 borderRight: index === headers.length - 1 ? 'none' : '1px solid' + borderColor,
						 zIndex: index === 0 ? 20 : 0,
						 left: 0,
						 position: index === 0 && firstLineFixed ? 'sticky' : 'static'}">
						{{autoBottomComputedItem(index)}}
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		name: 'v-table',
		props: {
			// ------------- 数据 -------------
			// 表格数据
			tableData: {
				type: Array,
				default: []
			},
			// 列头数据
			headers: {
				type: Array,
				default: []
			},
			// 需要合计的列的key
			computedCol: {
				type: Array,
				default () {
					return []
				}
			},
			// 需要格式化的列的key
			formatCol: {
				type: Array,
				default () {
					return []
				}
			},
			// ------------- 宽高 -------------
			// 默认列宽
			defaultColWidth: {
				type: Number,
				default: 165
			},
			// 表格宽度
			width: {
				type: String,
				default: `${uni.getSystemInfoSync().screenWidth}px`
			},
			// 表格高度，需要带单位
			height: {
				type: String,
				default: 'auto'
			},
			// 表头最小行高，单位 rpx
			headHeight: {
				type: Number,
				default: 70
			},
			// 内容最小行高，单位 rpx
			contentHeight: {
				type: Number,
				default: 100
			},
			// ------------- 位置 -------------
			// 文本位置
			align: {
				type: String,
				default: 'center'
			},
			// ------------- 样式 -------------
			// 是否高亮行
			isLightRow: {
				type: Boolean,
				default: true
			},
			// 空字符
			emptyString: {
				type: String,
				default: '-'
			},
			// 左边第一列是否固定
			firstLineFixed: {
				type: Boolean,
				default: false
			},
			// 底部合计列是否固定
			bottomComputedFixed: {
				type: Boolean,
				default: true
			},
			// 表头颜色
			headerBgColor: {
				type: String,
				default: '#f2f3f5'
			},
			// 单元格颜色
			itemBgColor: {
				type: String,
				default: '#ffffff'
			},
			// 边框颜色
			borderColor: {
				type: String,
				default: '#DFDFDF'
			}
		},

		computed: {
			// 是否高亮行
			isLight() {
				return function(rowIndex) {
					let result = ((rowIndex % 2 === 1) && this.isLightRow)
					return result
				}
			},
			// 行是否被点击
			isRowClick() {
				return function(rowIndex) {
					let result = this.currentIndex === rowIndex
					return result
				}
			},
			// 合计
			autoBottomComputedItem() {
				return function(index) {
					let bottomComputed = {}
					let needComputed = []
					// 遍历需要合计的列
					this.computedCol.forEach(key => {
						let computedColData = []
						this.tableDataSort.forEach(content => {
							computedColData.push(content[key] || '0')
						})
						needComputed.push(computedColData)
					})
					needComputed.forEach((item, index) => {
						let total = 0
						item.forEach(num => {
							total += parseFloat(num)
						})
						// 保留小数
						bottomComputed[this.computedCol[index]] = this.$YKUtils.keepDecimal(total,2)
					})
					let header = this.headers[index]
					let result = this.computedCol.includes(header.key) ?
						bottomComputed[header.key] : (index === 0 ? '合计' : this.emptyString)
						// 是否格式化
					if (this.formatCol.length !== 0) {
						this.formatCol.forEach(item => {
							// bottomComputedFormat: 底部统计是否也格式化
							if (item.bottomComputedFormat && (header.key === item.key) && (item.formatType==='money')) {
								// 金额模式（千分位）
								// let needRplace = this.$YKUtils.formatThousandStyle(this.$YKUtils.keepDecimal(bottomComputed[item.key],2))
								let needRplace = this.ykFormatAccount(bottomComputed[item.key],2,true)
								result = needRplace
							}
						})
					}
					return result
				}
			}
		},
		data() {
			return {
				chars: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
				tableDataSort: this.tableData.slice(),
				// 当前点击行
				currentIndex: -1
			};
		},
		methods: {
			// 点击行事件
			rowClick(rowIndex) {
				if (this.currentIndex === rowIndex) {
					this.currentIndex = -1
					return
				}
				this.currentIndex = rowIndex
			},
			// 将表头的属性与表格数据列一一对应
			autoContentItem(rowIndex, hIndex) {
				let content = this.tableDataSort[rowIndex]
				let header = this.headers[hIndex]
				let result = 0

				// 序号列
				if (hIndex === 0) {
					result = rowIndex + 1
					return result
				}

				if (content[header.key] || content[header.key] === 0) {
					result = content[header.key]
					// 格式化
					if (this.formatCol.length !== 0) {
						this.formatCol.forEach(item => {
							if ((header.key === item.key) && (item.formatType==='money')) {
								if(typeof(result)==='string'){
									result = parseFloat(result)
								}
								// 金额模式（千分位）
								result = this.ykFormatAccount(result,2,true)
							}
						})
					}
				} else {
					result = this.emptyString
				}
				return result
			},
			// 生成随机key值-row
			contentLineKey() {
				return this.randomString(32, this.chars)
			},
			// 生成随机key值-col
			contentItemKey() {
				return this.randomString(16, this.chars)
			},
			// 生成随机字符串
			randomString(length, chars) {
				var result = ''
				for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
				return result
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;

		.row {
			display: grid;
			grid-auto-flow: column;
			width: max-content;
			position: relative;

			.col {
				// break-all 强制换行
				word-break: break-all;
				width: 100%;
				display: flex;
				align-items: center;
			}
		}
	}

	.table-scroll-view {
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
	}

	.header {
		width: 100%;
		position: sticky;
		top: 0;
		// grid+column: 横向网格布局
		display: grid;
		grid-auto-flow: column;
		width: max-content;
		z-index: 25;
		// display: flex;

		.header-item {
			flex: 1;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			position: relative;
		}
	}

	// 点击行出现高亮状态
	.clickLightRow {
		background-color: $uni-color-primary !important;
		color: #FFFFFF !important;
	}
</style>
