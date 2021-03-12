import formatMethods from './method/format.js'
import md5 from './method/md5.js'
import combox from './method/combox.js'
import globalMethods from './global.js'
import validateMethods from '@/util/method/validate'
import { singleToolBarTemplate, authorityTemplate } from '@/util/constant/template'
import authorityMethods from '@/util/method/authority'
import {
  validNumerical
} from '@/util/constant/config'

export default {
  install: vue => {
    // 公用方法
    vue.prototype.ykFormatAccount = (value, digits, ifShowMoney) =>
      formatMethods.ykFormatAccount(value, digits, ifShowMoney)
    vue.prototype.ykDateFormat = (fmt, str) => formatMethods.ykDateFormat(fmt, str)
    vue.prototype.accAdd = (arg1, arg2) => formatMethods.accAdd(arg1, arg2)
    vue.prototype.accSub = (arg1, arg2) => formatMethods.accAdd(arg1, arg2)
    // vue.prototype.accDiv = (arg1, arg2) => formatMethods.accDiv(arg1, arg2)
    vue.prototype.accMul = (arg1, arg2) => formatMethods.accMul(arg1, arg2)
    vue.prototype.ykTimeSelectSureBack = (value) => formatMethods.ykTimeSelectSureBack(value)
    vue.prototype.md5 = (string) => md5.md5(string)
    vue.prototype.bindCombox = (url, code, method) => combox.bindCombox(url, code, method)
    vue.prototype.removeObjectNull = (obj) => globalMethods.removeObjectNull(obj)
    vue.prototype.removeArrayNull = (array) => globalMethods.removeArrayNull(array)
    vue.prototype.countTotal = (arr,key) => globalMethods.countTotal(arr,key)
    vue.prototype.concatByArr = (arr,key) => globalMethods.concatByArr(arr,key)

    // 变量
    vue.prototype.validNumerical = validNumerical
    vue.prototype.singleToolBarTemplate = singleToolBarTemplate
    vue.prototype.authorityTemplate = authorityTemplate

    // 权限方法
    vue.prototype.AuthorityFilter = path => authorityMethods.AuthorityFilter(path)
    vue.prototype.IfEmpower = (path, eID) => authorityMethods.IfEmpower(path, eID)
    vue.prototype.setSingleFormState = (Authority, id, form) => authorityMethods.setSingleFormState(Authority, id, form)

    // 校验方法
    vue.prototype.validateIP = (rule, value) => validateMethods.validateIP(rule, value)
    vue.prototype.validatePhoneTwo = (rule, value) => validateMethods.validatePhoneTwo(rule, value)
    vue.prototype.validateTelphone = (rule, value) => validateMethods.validateTelphone(rule, value)
    vue.prototype.validatePhone = (rule, value) => validateMethods.validatePhone(rule, value)
    vue.prototype.validateIdNo = (rule, value) => validateMethods.validateIdNo(rule, value)
    vue.prototype.validateEMail = (rule, value) => validateMethods.validateEMail(rule, value)
    vue.prototype.validateURL = textval => validateMethods.validateURL(textval)
    vue.prototype.isPassword = (rule, value) => validateMethods.isPassword(rule, value)
    vue.prototype.isInteger = (rule, value) => validateMethods.isInteger(rule, value)
    vue.prototype.isDecimal = (rule, value) => validateMethods.isDecimal(rule, value)
    vue.prototype.isNaturalNumber = (rule, value) => validateMethods.isNaturalNumber(rule, value)
    vue.prototype.isPercentZeroToHundred = (rule, value) => validateMethods.isPercentZeroToHundred(rule, value)
    vue.prototype.validateNumber = (rule, value) => validateMethods.validateNumber(rule, value)
    vue.prototype.validateDateTime = (rule, value) => validateMethods.validateDateTime(rule, value)
    vue.prototype.validateDateTimeNoEmpty = (rule, value) => validateMethods.validateDateTimeNoEmpty(rule, value)
  }
}
