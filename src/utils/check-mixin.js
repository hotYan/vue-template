/* 公共的mixin */

export function validateRule(rule, value, callback) {
  const reg = /[^a-zA-Z0-9_\-\u4e00-\u9fa5]/
  if (value) { // require值为true
    if (reg.exec(value)) {
      callback(new Error('包含非法字符'))
    } else {
      callback()
    }
  } else { // require值为false
    callback()
  }
}
export function validatePhone(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入手机号码'))
  } else if (!/^1[3456789]\d{9}$/.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

export function validatePassword(rule, value, callback) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/
  if (!value) {
    callback(new Error('请输入手机号码'))
  } else if (!reg.test(value)) {
    callback(new Error('密码长度不小于8,且由数字、字母组成'))
  } else {
    callback()
  }
}

export function validateTrim(rule, value, callback) {
  if (!value) {
    callback(new Error('内容不可为空'))
  } else if (/^\s*$/.test(value)) {
    callback(new Error('内容不可全为空格'))
  } else {
    callback()
  }
}

