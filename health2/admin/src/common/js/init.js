// import logon from './logon'
// import store from './store'
// import model from 'model'
// import APIconfig from 'util/APIconfig';
// import API from 'util/API';
// import url from 'util/url'
import {
  getSearchParams
} from 'common/js/util';
import APIconfig from 'api/APIconfig';
import {
  getToken
} from 'api/api';
export function initApp() {
  /**
   * 一开始跳转登录页，拿到code在请求token
   * 否则 登录初始化
   */
  if (!sessionStorage.token) {
    return new Promise((resolve) => {
      let search = window.location.search.slice(1);
      const obj = getSearchParams(search);
      if (!obj['state'] || !obj['code']) {
        location.href = `${APIconfig.oauth}/oauth/authorize?response_type=code&client_id=${APIconfig.client_id}&state=123&redirect_uri=${encodeURIComponent(`${window.location.origin}`)}`;
      } else {
        let search = window.location.search.slice(1);
        const obj = getSearchParams(search);
        return getToken(obj.code,resolve);
      }
    })
  } else {
    return Promise.resolve(true);
  }
}
