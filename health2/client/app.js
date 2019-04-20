//app.js
// var Api = require('api/api.js');
// var Util = require('util/util.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res.userInfo)
              this.globalData.userInfo = res.userInfo
              this.globalData.openid = wx.getStorageSync('openid') || null
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              const { updateUserApi } = require('./api/api.js')
              this.http(updateUserApi, { userInfo: res.userInfo} ).then(res => {
                console.log(res)
              })
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.reLaunch({
            url: '/pages/login/login'
          })
        }
      }
    })
  },
  // 封装的request请求
  http: function (url, data = '', method = "GET") { //封装http请求
    const apiUrl = this.globalData.baseUrl //请求域名
    const currency = {
      openid: this.globalData.openid || wx.getStorageSync('openid')
    }
    const token = wx.getStorageSync('token')
    return new Promise((resolve, reject) => {
      wx.request({
        url: apiUrl + url,
        data: Object.assign(currency, data),
        method: method,
        header: {
          'x-access-token': token
        },
        success: function (res) {
          if (res.data.code != 200) {
            wx.showModal({
              title: '提示',
              content: res.data.message,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          resolve(res.data)
        },
        fail: function (res) {
          reject(res);
        }
      })
    })
  },
  // 获取用户openid
  getOpenid: function (userInfo) {
    const { getOpenidApi } = require('./api/api.js')
    return new Promise((resolve, reject) => {
      const app = getApp()
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          this.http(getOpenidApi, { code: res.code }).then(res => {
            wx.setStorageSync('openid', res.data.openid)
            wx.setStorageSync('token', res.data.token)
            app.globalData.openid = res.data.openid
            resolve(res.data)
          })
        },
        fail: function (res) {
          reject(res);
        }
      })
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    baseUrl: 'http://localhost:8082',
  }
})