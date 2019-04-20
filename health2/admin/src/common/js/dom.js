/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 11:00:07
* @Last Modified by:   Administrator
* @Last Modified time: 2019-01-02 17:22:51
*/
import {Loading} from "element-ui";
/**
 * DOM操作类工具
 */
export function hasClass(el, className) {
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)")
  return reg.test(el.className)
}

export function addClass(el, className) { // 为节点添加class
  if (hasClass(el, className)) { // 如果已经有这个class就return
    return
  }

  let newClass = el.className.split(" ")
  newClass.push(className)
  el.className = newClass.join(" ")
}

export function getData(el, name, val) { // get或者set节点属性，data-前缀开头
  const prefix = "data-"
  if (val) { // 有值就set
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name) // 没值就get
}

let elementStyle = document.createElement("div").style

let vendor = (() => {
  let transformNames = {
    webkit: "webkitTransform",
    Moz: "MozTransform",
    O: "OTransform",
    ms: "msTransform",
    standard: "transform"
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === "standard") {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export function loading(params = {}) {
  const {text, target, fullscreen, lock } = params;
  return Loading.service({
    text: text || "加载中...",
    target: target ? (typeof target === "string" ? document.querySelector(target) : target) : document.body,
    fullscreen: fullscreen || true,
    lock: lock || false
  });
}
