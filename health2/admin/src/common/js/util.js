/*
 * @Author: FangXiaoHui
 * @Date:   2018-11-01 11:00:07
 * @Last Modified by:   fangxiaohui
 * @Last Modified time: 2018-12-24 14:26:27
 */

/**
 * 通用函数类工具
 */

// 随机数（最小，最大）向下取整
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// 数组随机顺序打乱
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 延迟器，（执行函数，毫秒数）
export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 格式化url，data拼接进url
export function formatUri(url, data) {
  if (data) {
    url += (url.indexOf('?') < 0 ? '?' : '') + spliceParams(data);
  }
  return url
}

function spliceParams(data) { // 接收一个对象进行拼接
  let url = '';
  for (let i in data) {
    let value = data[i] !== undefined ? data[i] : '';
    url += `&${i}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : '' // url存在则切割掉第一个&
}

// 数组去重
export function uniq(array){
    var temp = []; // 一个新的临时数组
    for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) === -1) {
            temp.push(array[i]);
        }
    }
    return temp;
}

/**
* 根据单点登录返回的参数
* 格式化返回对象，key：value的格式
*/
export function getSearchParams(str) {
  let obj = {};
  const arr = str.split('&');
  for (let i of arr){
    if (i.indexOf('=') === -1) {
      return {}
    }
    let keyValue = i.split('=');
    obj[keyValue[0]] = keyValue[1];
  }
  return obj
}

/*
* 多层级获取对应的对象，
* 即树形数据，获取深层次对应id的对象
*/
export function getTargetObject(targetArr, id) { // 参数1：目标数组，参数2： 对应筛选字段,如：'1','2'
  return targetArr.find((item) => {
    return item.id === id
  })
}