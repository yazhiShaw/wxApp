// pages/my/my.js
const app = getApp()
const { addActApi, getMsgApi, updateSignApi, getUserApi, updateUserApi } = require('../../api/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: '',
    total: 0,
    userInfo: {},
    input: false,
    sign: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    const oneOpenid = app.globalData.openid || wx.getStorageSync('openid')
    app.http(updateUserApi, { userInfo: app.globalData.userInfo }).then(res => {
      that.setData({
        userInfo: res.data
      })
    })
    app.http(getMsgApi, { oneOpenid,act: 'findMyActicles' }).then(res => {
      that.setData({
        article: res.data.list,
        total: res.data.total
      })
    })
    
  },
  edit: function () {
    let that = this
    that.setData({
      input: true,
    })
  },
  signInput: function (e) {
    console.log(e)
    this.setData({ sign: e.detail.value });
  },
  submit: function () {
    let that = this
    if (that.data.sign.length > 50) {
      wx.showToast({
        title: '不可超过50个字符',
        icon: 'none',
        duration: 1500
      })
    }else {
      app.http(updateSignApi, { sign: that.data.sign }, 'POST').then(res => {
        that.setData({
          input: false,
          userInfo: res.data,
          sign: ''
        })
      })
    }
  },
  addAct: function(){
    wx.navigateTo({
      url: "/pages/addAct/addAct",
    })
  },
  getAct: function(){
    wx.navigateTo({
      url: "/pages/act/act",
    })
  },
  getMyCollect: function(){
    wx.navigateTo({
      url: "/pages/myCollect/myCollect"
    })
  },
  getFocus: function() {
    let friendId = 
    wx.navigateTo({
      url: "/pages/myFocus/myFocus?friendId=" + friendId
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})