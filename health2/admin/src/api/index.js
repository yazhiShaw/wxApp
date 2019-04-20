import {
  api
} from './api';

// 应用列表
export function userList(data){
  return api(`/api/admin/getUser`, data)
}
export function delUser(data) {
  return api(`/api/admin/delUser`, null, data)
} 

export function msgList(data) {
  return api(`/api/admin/getMsg`, data)
}

export function delMsg(data) {
  return api(`/api/admin/delMsg`, null, data)
} 

export function actList(data) {
  return api(`/api/admin/getAct`, data)
}

export function delAct(data) {
  return api(`/api/admin/delAct`, null, data)
}

export function getActDetail(data) {
  return api(`/api/public/getActDetail`, data)
}

export function getMsgDetail(data) {
  return api(`/api/public/getMsgDetail`, data)
}

export function actStatus(data) {
  return api(`/api/admin/actStatus`, null, data)
}

export function login(data) {
  return api(`/api/admin/login`, null, data)
}