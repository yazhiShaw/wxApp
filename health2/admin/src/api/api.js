/*
 * @Author: FangXiaoHui
 * @Date:   2018-11-06 11:25:11
 * @Last Modified by:   Administrator
 * @Last Modified time: 2019-01-22 11:34:17
 */
import axios from 'axios';
import {
  formatUri
} from '../common/js/util';
import APIconfig from '../api/APIconfig';
import {
  Message
} from 'element-ui';
// 添加响应拦截器
axios.interceptors.response.use(config => {
  console.log(config.data.code)
  if (config.data.code == 401) {
    window.location.href = '#/login';
  } else {
    return config;
  }
}, error => {
  Message.error(`请求出错了哟~T.T`);
  return Promise.reject(error);
}
);

/* url请求地址，urlData发送的数据，params是post或get请求，默认为get请求 */
export function api(url, urlData, params = {}) {
  const formatUrl = formatUri(url, urlData);
  const token = sessionStorage.getItem('token') || '';
  if (JSON.stringify(params) === '{}') {
    return axios.get(APIconfig.url + formatUrl, {
      headers: {
        'x-access-token': `${token}`
      }
    }).then((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.data);
      }
    }).catch((e) => {
      console.log(e)
    })
  } else {
    return axios.post(APIconfig.url + formatUrl, params, {
      headers: {
        'x-access-token': `${token}`,
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.data);
      }
    }).catch((e) => {
      console.log(e)
    })
  }
}
