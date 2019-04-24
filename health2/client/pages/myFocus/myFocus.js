// pages/myFocus/myFocus.js
const { getFocusApi } = require('../../api/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusList:[],
    noneImg: "../../images/none.jpg"
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
    // let friendId = that.data.friendId
    app.http(getFocusApi).then(res => {
      that.setData({
        focusList: res.data
      })
    })
  },
  toOneArticle: function (e) {
    const openid = e.currentTarget.dataset.openid
    wx.navigateTo({
      url: "/pages/allArticle/allArticle?openid=" + openid,
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