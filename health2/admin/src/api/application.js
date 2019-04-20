import axios from 'axios';
import qs from 'qs';
import APIconfig from './APIconfig.js';
import {
  api
} from './api';

const application = {
  // 应用列表
  applicationList(data) {
    return api(`/api/application/list?`,null, data)
  },
  // 组织选择器
  applicationGroup() {
    return api('/api/dictionary/query?code=group');
  },
  // 创建授权组织查询
  applicationTeam(data) {
    return api('/api/organization/listbytype', data)
  },
  // 上传
  upload() {
    const USER_INFO = sessionStorage.getItem('token');
    const token = JSON.parse(USER_INFO)['access_token'] ? JSON.parse(USER_INFO)['access_token'] : undefined;
    let uploadMsg = {};
    uploadMsg.addr = 'http://192.168.1.81:7111/odms/common/upload';
    uploadMsg.headers = {
      'Authorization': `Bearer ${token}`
    }
    return uploadMsg;
  },
  // 应用列表(编辑和查询)
  applicationDetail(data) {
    return api(`/api/application/detail`, data);
  },
  applicationDelete(data) {
    return api(`/api/application/delete`, null, data);
  },
  // 应用管理相关授权组织状态
  organizationStatus(data) {
    return api(`/api/application/status`, data);
  },
  applicationSave(data) {
    return api(`/api/application/save`, null, data)
  },
  applicationEdit(data) {
    return api(`/api/application/edit`, null, data)
  },
  // 其他接口………
}
export default application;
