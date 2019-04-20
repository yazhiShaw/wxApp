// pages/act/act.js
const app = getApp()
const { getActApi } = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navName: ['所有活动', '我发起的活动'],
    navId: 0,
    active: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.http(getActApi, { navId: options.navId || that.data.navId }).then(res => {
      that.setData({
        act: res.data.list,
        active: options.navId || that.data.navId,
      })
    })
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

  },
  chooseTab: function (e) {
    let that = this
    that.setData({
      navId: e.detail.index
    })
    app.http(getActApi, { navId: that.data.navId }).then(res => {
      console.log('getActApi', res.data)
      that.setData({
        act: res.data.list
      })
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