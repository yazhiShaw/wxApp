/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 11:00:07
* @Last Modified by:   Administrator
* @Last Modified time: 2019-01-07 15:26:47
*/

/**
 * 判断类工具
 */

const prejudge = {
	/**
	 * 是否是一个数组
	 */
	isArray: obj => {
		return Object.prototype.toString.call(obj) === '[object Array]'
	},
	/**
	 * 是否是一个对象
	 */
	isObject: obj => {
		return Object.prototype.toString.call(obj) === '[object Object]'
	},
	/**
	 * 是否是一个字符串
	 */
	isString: obj => {
		return Object.prototype.toString.call(obj) === '[object String]'
	},
	/**
	 * 是否是一个数字
	 */
	isNumber: obj => {
		return Object.prototype.toString.call(obj) === '[object Number]'
	},
	/**
	 * 深拷贝
	 */
  /* eslint-disable no-undef */
	deepClone: data => {
		let t = Object.prototype.toString.call(data);
		let o;
		let i;
		let ni;
		if (t === '[object Array]') {
			o = []
		} else if (t === '[object Object]') {
			o = {}
		} else {
			return data
		}
		if (t === '[object Array]') {
			for (i = 0, ni = data.length; i < ni; i++) {
				o.push(deepClone(data[i]))
			}
			return o
		} else if (t === '[object Object]') {
			for (i in data) {
				o[i] = deepClone(data[i])
			}
			return o
		}
	},
	/**
	 * 验证邮箱
	 */
	validEmail: value => {
		const reg = /^\w+@\w+\.(com|cn|net|org)$/;
		return reg.test(value)
	},
	/**
	 * 验证区号(3-4位数)
	 */
	validZoneCode: value => {
		const reg = /^\d{3,4}$/;
		return reg.test(value)
	},
	/**
	 * 验证电话号码(7-8位数)
	 */
	validTelephone: value => {
		const reg = /^\d{7,8}$/;
		return reg.test(value)
	},
	/**
	 * 验证身份证
	 */
	validCardId: value => {
		const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
		return reg.test(value)
	},
	/**
	 * 验证特殊字符
	 */
	validChars: value => {
		const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
		return reg.test(value)
	},
	/**
	 * 验证QQ
	 */
	validQq: value => {
		const reg = /^[0-9]{5,}$/;
		return reg.test(value)
	},
	/**
	 * 去掉空格
	 */
	validSpace: value => {
		value = value.replace(/(^\s*)|(\s*$)/g, '');
		return value
	}
}

export default prejudge;