const app = getApp()
const { formatTime } = require('../../utils/util.js')
const { getActDetailApi } = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act: '',
    basePicUrl: app.globalData.basePicUrl,
    show: false,
    navId: 0,
    nowStamp: '',
    actStamp: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.http(getActDetailApi, { actId: options.actId }).then(res => {
      that.setData({
        act: res.data,
        actStamp : Date.parse(res.data.actTime),
        navId: options.navId,
        nowStamp: Date.parse(new Date()),
      })
    })
  },
  join(){
    let that = this
    this.setData({
      show: true
    })
  },
  onclose() {
    this.setData({ show: false });
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