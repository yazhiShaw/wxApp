// pages/login/login.js
const app = getApp()
const { updateUserApi } = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户头像
  onGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      this.checkToken();
    }
  },
  // 检查token有效期
  checkToken: function () {
    let that = this;
    let token = wx.getStorageSync('token');
    if (!token) { // 没有token去登录
      app.getOpenid();
    } else { // 有token保存用户信息
      that.saveUserInfo();
    }
  },
  saveUserInfo: function(){
    app.http(updateUserApi, { userInfo: app.globalData.userInfo }).then(res => {
      if ((res.code == 401)) {
        wx.removeStorageSync('token')
        app.getOpenid()
      } else if (res.code == 200) {
        wx.switchTab({
          url: '/pages/index/index',
        });
      } else {
        wx.showModal({
          title: 'Sorry',
          content: '同步用户信息出错~',
        })
      }
    })
  },
})