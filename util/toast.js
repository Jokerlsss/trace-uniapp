/**
 * image - 最好为白色
 * mask  - 防止触摸穿透
 */
import * as TEXT from '../common/text.js'

// 成功
export const successToast = () => uni.showToast({
  title: TEXT.RES_SUCCESS,
  duration: 1500,
  mask: true
})

// 失败
export const failToast = () => uni.showToast({
  title: TEXT.RES_FAIL,
  image: '/static/img/err.png',
  duration: 1500,
  mask: true
})

// 加载
export const loadToast = () => uni.showLoading({
  title: TEXT.LOADING,
  mask: true
})

// 登录失败
export const failLoginToast = () => uni.showToast({
  title: TEXT.LOGIN_FAIL,
  image: '/static/img/err.png',
  duration: 1000,
  mask: true
})

// 信息未填写完整
export const unCompleteToast = () => uni.showToast({
  title: TEXT.CONTENT_UN_COMPLETE,
  image: '/static/img/err.png',
  duration: 1500,
  mask: true
})

// 全局带遮罩弹窗
export const handleToast = (title, state = 'success', isBack = true) => uni.showToast({
  title: title.length >7 ? title.substring(0,6) + '..' : title,
  image: '/static/img/'+state+ '.png',
  duration: 1500,
  mask: true,
  success: () => {
    if (isBack) {
      setTimeout(() => {
        uni.navigateBack({})
      }, 1400);
    }
  }
})