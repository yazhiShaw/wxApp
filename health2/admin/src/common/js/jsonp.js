/*
* @Author: FangXiaoHui
* @Date:   2018-11-01 11:00:07
* @Last Modified by:   Administrator
* @Last Modified time: 2018-11-22 11:05:21
*/

/**
 * JSONP请求类工具
 */

import originJsonp from 'jsonp';
import {formatUri} from './util';

export default function jsonp(url, data, option) {
  url = formatUri(url, data);

  return new Promise((resolve, reject) => { // 返回一个promise
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}