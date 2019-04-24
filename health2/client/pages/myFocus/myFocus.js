// pages/myFocus/myFocus.js
const { getFocusApi, addFocus } = require('../../api/api.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusList:[],
    noneImg: "../../images/none.jpg",
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
      console.log(res.data)
      that.setData({
        focusList: res.data
      })
    })
  },
  toFocus: function (e) {
    console.log(111)
    let that = this
    const friendId = e.currentTarget.dataset.friendid
    const avatarUrl = e.currentTarget.dataset.avatarurl
    const nickName = e.currentTarget.dataset.nickname
    const focus = e.currentTarget.dataset.focus
    let data = ''
    // 取消关注
    wx.showModal({
      title: '提示',
      content: '确定取消关注吗？',
      success: function (res) {
        if (res.confirm) {
          app.http(addFocus, { friendId }, 'POST').then(res => {
            if (res.code === 200) {
              app.http(getFocusApi, data).then(res => {
                that.setData({
                  focusList: res.data
                })
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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