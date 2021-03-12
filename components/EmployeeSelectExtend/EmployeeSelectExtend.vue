<template>
  <view>
    <u-popup
      v-model="showModal"
      @open="handleShowModal"
      @close="closeModal"
      height="780"
      mode="bottom"
	  border-radius="30"
    >
	<view class="title">
		选择人员
	</view>
      <!-- <view class="search">
        <u-search
          placeholder="请输入员工姓名"
          v-model="searchValue"
          height="80"
          placeholder-color="#CFCFCF"
          search-icon-color="#CFCFCF"
          bg-color="#fff"
          safe-area-inset-bottom
          @custom="clickSearch"
          :action-style="actionStyleObj"
        ></u-search>
      </view> -->
      <scroll-view
        class="modalBody"
        :scroll-y="true"
        lower-threshold="1"
        @scrolltolower="refreshData"
      >
        <view class="box">
          <view
            class="modalItems"
            v-for="(item, index) of modalData"
            :key="index"
            @click="pickMan(item)"
          >
            <image src="../../static/img/icon/form-list-user.png"></image>
            <view class="item"
              ><text style="color: #101010">姓名：</text
              >{{ item.name }}</view
            >
            <view class="item"
              ><text style="color: #101010">编号：</text
              >{{ item.num }}</view
            >
          </view>
          <v-no-more v-show="ifBottom"></v-no-more>
        </view>
      </scroll-view>
    </u-popup>
    <!-- 弹出框 -->
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
export default {
  data () {
    return {
      // 搜索内容
      searchValue: '',
      // 搜索按钮样式
      actionStyleObj: {
        height: "64rpx",
        width: "120rpx",
        background: "#fff",
        borderRadius: "100rpx",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      // 是否打开
      showModal: false,
      // 分页选项
      pageIndex: 1,
      // 单页页数
      // pageSize: 10,
      // 菜单参数
      menuArgs: '',
      // 选择框数据
      modalData: [],
      // 是否触底了
      ifBottom: false,
      // 查询条件
      // sqlTitle: ''
    }
  },
  props:{
	  sqlTitle:{
		  type: String,
		  default: ''
	  }
  },
  methods: {
    // 打开模态窗
    handleShowModal () {
      const that = this
      that.modalData = []
      that.BindData()
    },
    // 关闭弹出层
    closeModal() {
      const that = this
      that.pageIndex = 1
      // that.sqlTitle = ''
    },
    // 绑定数据
    async BindData () {
      const that = this
      const res = await this.$http.request({
        url: '/Select/HREmployeeSelect/list',
        method: 'post',
        data: {
          pageIndex: that.pageIndex,
          pageSize: that.$store.state.pageSize,
          menuArgs: that.menuArgs,
          sqlTitle: that.sqlTitle
        }
      })
      if (!res.isSuccess) {
        this.$refs.uToast.show({
          title: res.errorMessage,
          type: 'error',
        })
        return false
      }
      for (let item of res.data.rows) {
        that.modalData.push(item)
      }
      res.data.rows.length !== that.$store.state.pageSize && (that.ifBottom = true)
    },
    // 下拉刷新
    refreshData () {
      const that = this
      if (!that.ifBottom) {
        that.pageIndex += 1
        that.BindData()
      }
    },
    // 查找
    // clickSearch () {
    //   const that = this
    //     that.modalData = []
    //     this.sqlTitle = 'BDept||'+this.params
    //     this.pageIndex = 1
    //     this.BindData()
    // },
    // 选中员工
    pickMan (Man) {
      this.$emit('sureBack', Man)
      this.showModal = false
    }
  }
}
</script>
<style lang='scss' scoped>
	.title{
		width: 100%;
		height: 80rpx;
		font-size: 30rpx;
		color: $uni-text-color-subtitle;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f2f3f5;
		}
.search {
  position: sticky;
  top: 0;
  background: #f2f3f5;
  padding: 10rpx 0;
  z-index: 60;
}
.modalBody {
  height: 670rpx;
  background: #f2f3f5;
  width: 100%;
  padding: 10rpx 0;
  
  .box {
    width: 100%;
    padding: 0 10rpx;
	
    .modalItems {
      /* margin: 10rpx 0; */
	  margin: 15rpx auto;
      height: 100rpx;
      width: 90%;
      background: #ffffff;
      border-radius: 20rpx;
      display: flex;
      justify-content: start;
      align-items: center;
	  
	  &:active{
		  opacity: 0.5;
	  }
	  
      image {
        width: 40rpx;
        height: 40rpx;
        margin: 0 20rpx;
      }
      .item {
        width: 40%;
        color: $uni-text-color-base;
        font-size: 28rpx;
        // margin-right: 20rpx;
      }
    }
  }
}
</style>