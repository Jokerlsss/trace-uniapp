import http from '../../common/vmeitime-http/index.js'
export default {
  bindCombox(url, code, method = 'get') {
    let optionArr = []
    let optionObj = {}
    http.request({
        url: url,
        method: method,
      })
      .then(res => {
        if (!res.isSuccess) {
          uni.showToast({
            icon: "none",
            title: "网络错误"
          })
          return false
        }
        if (typeof (code) === 'string') {
          for (let item of res.data) {
            if (item.code === code) {
              let cache = {
                label: item.name,
                value: item.value
              }
              optionArr.push(cache)
            }
          }
        }else {
          for (let codeItem of code) {
            optionObj[codeItem] = []
            for (let item of res.data) {
              if (item.code === codeItem) {
                let cache = {
                  label: item.name,
                  value: item.value
                }
                optionObj[codeItem].push(cache)
              }
            }
          }
        }

      })
      .catch(() => {
        uni.showToast({
          icon: "none",
          title: '网络错误,请检查网络连接!'
        })
      })

    switch (typeof(code)) {
    	case 'object':
        return optionObj
        default:
    		return optionArr
    }
  }
}