//index.js
const app = getApp()
const { getMsgApi, updateUserApi } = require('../../api/api.js')
Page({
  data: {
    showMask: false,
    userInfo: {
      avatarUrl: '../../images/user-unlogin.png'
    },
    article: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navId: 0,
    navName: ['养生推荐', '佛系健康', '佛系美容', '佛系美食', '佛系茶道'],
    active: 0,
    page: 1,
    hasNext: 0
  },
  onLoad: function () {
    let that = this
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        app.globalData.openid = wx.getStorageSync('openid')
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    let that = this
    // 请求文章（动态）列表
    const openid = app.globalData.openid || wx.getStorageSync('openid')
    // console.log(that.data.userInfo.nickName)
    if (!openid) {
      app.getOpenid(that.data.userInfo).then(() => {
        app.http(getMsgApi, { navId: 0 }).then(res => {
          that.setData({
            article: that.data.article.concat(res.data.list),
            active: 0,
            page: res.data.page,
            hasNext: res.data.hasNext,
          })
        })
      })
    } else {
      app.http(getMsgApi, { navId: 0 }).then(res => {
        that.setData({
          article: res.data.list,
          active: 0,
          page: res.data.page,
          hasNext: res.data.hasNext,
        })
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    if(that.data.hasNext == 1){
      wx.showLoading({
        title: '玩命加载中',
      })
      // 页数+1
      let page = that.data.page + 1
      app.http(getMsgApi, { navId: that.data.navId, page }).then(res => {
        that.setData({
          article: that.data.article.concat(res.data.list),
          active: 0,
          page: res.data.page,
          hasNext: res.data.hasNext,
        })
        wx.hideLoading();
      })
    }else {
      wx.showToast({
        title: '已经到底了',
        duration: 1500
      })
    }
  },
  chooseTab: function (e) {
    let that = this
    that.setData({
      navId: e.detail.index
    })
    app.http(getMsgApi, { navId: that.data.navId }).then(res => {
      console.log('getMsgApi', res.data)
      that.setData({
        article: res.data.list
      })
    })
  },
  onSearch: function(e) {
    console.log(1)
    debugger
  },
  onMyEvent: function (e) {
    let that = this
    this.setData({
      active: e.detail.active,
      navId: e.detail.active,
    })
    app.http(getMsgApi, { navId: that.data.navId }).then(res => {
      that.setData({
        article: res.data.list
      })
    })
  },
  // 获取用户头像
  onGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.setStorage({
        key: 'userInfo',
        data: e.detail.userInfo
      })
      this.setData({
        userInfo: e.detail.userInfo,
        showMask: false
      })
    }
  },
})
