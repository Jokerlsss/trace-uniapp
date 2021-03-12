<template>
  <view>
    <!-- 唤起操作菜单按钮 -->
    <v-bottom-btn
      @btnClick="openActionSheet"
      text="操 作"
      borderTopColor="#f2f3f5"
      color="#F0AD4E"
      bgColor="#f2f3f5"
    ></v-bottom-btn>
    <!-- 操作菜单 -->
    <u-action-sheet
      border-radius="30"
      @click="clickActionSheetItem"
      :list="actionSheetList"
      v-model="actionSheetShow"
    ></u-action-sheet>
  </view>
</template>
<script>
export default {
  props: {
    parentObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    moreMenu: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // 操作菜单可见性
      actionSheetShow: false,
      // 操作菜单
      actionSheetList: []
    }
  },
  methods: {
    // 打开操作菜单
    openActionSheet () {
      let cacheMenu = {
        ...this.parentObj.SingleToolBar
      }
      this.actionSheetShow = !this.actionSheetShow
      this.actionSheetList = [{
        text: '锁定',
        disabled: !cacheMenu.lock.Enable,
        event: 'lock'
      }, {
        text: '解锁',
        disabled: !cacheMenu.unlock.Enable,
        event: 'unlock'
      }, {
        text: '删除',
        disabled: !cacheMenu.del.Enable,
        event: 'del'
      }, {
        text: '保存',
        disabled: !cacheMenu.save.Enable,
        event: 'save'
      }]
      if (cacheMenu.approve.Visible) {
        this.actionSheetList.push({
          text: '发起流程',
          disabled: !cacheMenu.unlock.Enable,
          event: 'submit'
        })
      }
      for (let item of this.moreMenu) {
        this.actionSheetList.push(item)
      }
    },
    barProperty () {
      return {
        ...this.parentObj.SingleToolBar
      }
    },
    // 点击操作菜单的具体项         
    clickActionSheetItem (index) {
      this.parentObj[this.actionSheetList[index].event]()
      return
    },
  }
}
</script>
