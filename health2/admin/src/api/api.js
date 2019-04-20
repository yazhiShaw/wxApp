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

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  console.log(`请求${response.status}了哟~T.T`, 2);
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    Message.error(`请求${error.response.status}了哟~T.T`);
    return Promise.reject(error);
  }
);

/* url请求地址，urlData发送的数据，params是post或get请求，默认为get请求 */
export function api(url, urlData, params = {}) {
  const formatUrl = formatUri(url, urlData);
  if (JSON.stringify(params) === '{}') {
    return axios.get(APIconfig.url + formatUrl).then((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.data);
      }
    }).catch((e) => {
      console.log(e)
    })
  } else {
    return axios.post(APIconfig.url + formatUrl, params, {
      headers: {
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
