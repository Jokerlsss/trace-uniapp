import { validNumerical } from '@/util/constant/config'
export default {
    // 是否合法IP地址
    validateIP(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
            if ((!reg.test(value)) && value) {
                reject(new Error('请输入正确的IP地址'))
            } else {
                resolve()
            }
        })
    },
    // 是否手机号码或者固话
    validatePhoneTwo(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
            if ((!reg.test(value)) && value) {
                reject(new Error('请输入正确的手机号码或者固话号码(格式：区号+号码,如010-1234567)'))
            } else {
                resolve()
            }
        })
    },
    // 是否固话
    validateTelphone(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            const reg = /0\d{2,3}-\d{7,8}/
            if ((!reg.test(value)) && value) {
                reject(new Error('请输入正确的固话（格式：区号+号码,如010-1234567）'))
            } else {
                resolve()
            }
        })
    },
    // 是否手机号码
    validatePhone(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            const reg = /^[1][3,4,5,7,8][0-9]{9}$/
            if ((!reg.test(value)) && value) {
                reject(new Error('请输入正确的电话号码'))
            } else {
                resolve()
            }
        })
    },
    // 是否身份证号码
    validateIdNo(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
            if ((!reg.test(value)) && value) {
                reject(new Error('请输入15、18位身份证号码'))
            } else {
                resolve()
            }
        })
    },
    // 是否邮箱
    validateEMail(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if ((!reg.test(value)) && value) {
                reject(new Error('请输入正确的邮箱'))
            } else {
                resolve()
            }
        })
    },

    // 验证内容是否英文数字以及下划线
    isPassword(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            const reg = /^[_a-zA-Z0-9]+$/
            if ((!reg.test(value)) && value) {
                reject(new Error('密码仅由英文字母，数字以及下划线组成'))
            } else {
                resolve()
            }
        })
    },
    // 验证是否整数 -2147483647 到 2147483647
    isInteger(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            let validText = ''
            if (!value) {
                resolve()
            } else {
                let re = /^-?[0-9]\d*$/
                let max = 2147483647
                let min = -2147483648
                const length = rule.length || 32
                if (length === 8) {
                    max = 255
                    min = 0
                } else if (length === 16) {
                    max = 32767
                    min = -32768
                }
                if (rule.validNumerical === validNumerical.nonNegative) {
                    re = /^[0-9]\d*$/
                    validText = '>=0'
                } else if (rule.validNumerical === validNumerical.greaterThanZero) {
                    re = /^[1-9]\d*$/
                    validText = '>0'
                } else if (rule.validNumerical === validNumerical.noZero) {
                    re = /^[-]?[1-9][0-9]*$/
                    validText = '!=0'
                }
                const rsCheck = re.test(value)
                if (!rsCheck) {
                    reject(new Error(`请输入${validText}整数`))
                } else if (value > max || value < min) {
                    reject(new Error(`请输入${min}-${max}的整数`))
                } else {
                    resolve()
                }
            }
        })
    },
    // 验证是否整数 并且>=0
    isNaturalNumber(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            if (!value) {
                resolve()
            }
            const re = /^([1-9]\d*|0)$/
            const rsCheck = re.test(value)
            if (!rsCheck) {
                reject(new Error('请输入非负整数'))
            } else {
                resolve()
            }
        })
    },
    // 验证是否小数
    isDecimal(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            let validText = ''
            if (!value) {
                resolve()
            } else {
                let validText = ''
                let reg = /^[-]?\d+(\.\d+)?$/
                if (rule.validNumerical === validNumerical.nonNegative) {
                    reg = /^\d+(\.\d+)?$/
                    validText = '>=0'
                } else if (rule.validNumerical === validNumerical.greaterThanZero) {
                    reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/
                    validText = '>0'
                }
                const rsCheck = reg.test(value)
                if (!rsCheck) {
                    reject(new Error(`请输入${validText}小数`))
                } else {
                    const length = rule.length || 18
                    const decimalLength = rule.decimalLength || 2
                    const arr = value.toString().split('.')
                    if (arr.length > 0 && arr[0].length > length - decimalLength) {
                        reject(new Error(`请输入整数部分${length - decimalLength}位的小数`))
                    } else if (arr.length > 1 && arr[1].length > decimalLength) {
                        reject(new Error(`请输入小数部分${decimalLength}位的小数`))
                    } else {
                        resolve()
                    }
                }
            }
        })
    },
    // 验证是否是0到100的百分比
    isPercentZeroToHundred(rule, value, callback) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            if (value === '0' || value === 0) {
                resolve()
            } else if (!Number(value)) {
                reject(new Error('请输入[0,100]之间的数字'))
            } else {
                if (value < 0 || value > 100) {
                    reject(new Error('请输入[0,100]之间的数字'))
                } else {
                    resolve()
                }
            }
        })
    },
    // 纯数字校验
    validateNumber(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            let numberReg = /^\d+$|^\d+[.]?\d+$/
            if (value !== '' && !numberReg.test(value)) {
                reject(new Error('请输入数字'))
            } else {
                resolve()
            }
        })
    },
    // 验证网址
    validateURL(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-useless-escape
            let numberReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
            if (value !== '' && !numberReg.test(value)) {
                reject(new Error('请输入正确网址'))
            } else {
                resolve()
            }
        })
    },
    // 时间校验
    validateDateTimeNoEmpty(rule, value) {
        let message = '不能为空'
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
            message = rule.message
        }
        return new Promise((resolve, reject) => {
            if (value) {
                value = value.replace(/\//g, '-')
                var dateReg = /^(\d{4})-(\d{1,2})-(\d{1,2})/
                var dateReg1 = /^(\d{4})年(\d{1,2})月(\d{1,2})日/
                if (!value.match(dateReg) && !value.match(dateReg1)) {
                    reject(new Error('请输入正确的日期格式'))
                } else {
                    var date = new Date(value)
                    if (!date.getDate()) {
                        reject(new Error('请输入正确的日期格式'))
                    } else if (date.getFullYear() === 1900) {
                        reject(new Error(message))
                    } else {
                        resolve()
                    }
                }
            } else {
                reject(new Error(message))
            }
        })
    },
    // 时间校验
    validateDateTime(rule, value) {
        if (rule.cellValue) {
            value = rule.cellValue
            rule = rule.rule
        }
        return new Promise((resolve, reject) => {
            if (value) {
                value = value.replace(/\//g, '-')
                var dateReg = /^(\d{4})-(\d{1,2})-(\d{1,2})/
                var dateReg1 = /^(\d{4})年(\d{1,2})月(\d{1,2})日/
                if (!value.match(dateReg) && !value.match(dateReg1)) {
                    reject(new Error('请输入正确的日期格式'))
                } else {
                    var date = new Date(value)
                    if (!date.getDate()) {
                        reject(new Error('请输入正确的日期格式'))
                    } else {
                        resolve()
                    }
                }
            } else {
                resolve()
            }
        })
    }
}
