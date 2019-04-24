// pages/my/my.js
const app = getApp()
const { getMsgApi } = require('../../api/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: '',
    total: 0,
    userInfo: {},
    // focus:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    const oneOpenid = options.openid
    app.http(getMsgApi, { oneOpenid, act: 'findMyActicles' }).then(res => {
      that.setData({
        article: res.data.list,
        total: res.data.total,
        userInfo: res.data.userInfo,
        // focus: res.data.focus
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
  onShow: function (options) {
    
  },
})