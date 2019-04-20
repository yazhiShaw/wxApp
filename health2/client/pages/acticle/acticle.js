// pages/acticle/acticle.js
const app = getApp()
const {
  getMsgDetailApi,
  addCommentApi,
  addLikeApi
} = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图的黑点
    indicatorDots: true,
    // 轮播图方向
    vertical: false,
    // 是否自动播放
    autoplay: true,
    // 是否采用衔接滑动
    circular: true,
    // 自动切换时间间隔
    interval: 2000,
    // 滑动动画时长
    duration: 500,
    // 评论内容
    content: '',
    article: {},
    userInfo: '',
    baseUrl: "http://localhost:8082/file/images/",
    noneImg: "../../images/none.jpg"
  },
  changeProperty: function(e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  contentInput: function(e) {
    this.setData({
      content: e.detail.value
    });
  },
  // 发布评论
  addComment: function(e) {
    let that = this
    let toCommentId = e.currentTarget.dataset.tocommentid || -1
    if (that.data.content != '' && that.data.content != null) {
      app.http(addCommentApi, {
        content: that.data.content,
        commentNickName: that.data.userInfo.nickName,
        commentAvatarUrl: that.data.userInfo.avatarUrl,
        toCommentId,
        messageId: that.data.article._id,
      }, 'POST').then(res => {
        wx.showToast({
          title: '评论成功',
          icon: 'none',
          duration: 1000
        })
        app.http(getMsgDetailApi, {
          messageId: that.data.article._id
        }).then(res => {
          that.setData({
            article: res.data,
          })
        })
      })
    } else {
      wx.showToast({
        title: '评论不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    that.setData({
      content: ''
    })
  },
  // 点赞
  addLike: function(e) {
    let that = this
    const like = !e.currentTarget.dataset.like
    const messageId = e.currentTarget.dataset.messageid
    app.http(addLikeApi, {
      like,
      messageId
    }, 'POST').then(res => {
      if (res.code === 200) {
        app.http(getMsgDetailApi, {
          messageId
        }).then(res => {
          that.setData({
            article: res.data,
          })
        })
      }
    })
  },
  // 点击头像跳到对应的所有文章列表
  toOneArticle: function(e) {
    const openid = e.currentTarget.dataset.openid
    if (openid == app.globalData.openid) {
      wx.switchTab({
        url: "/pages/my/my",
      })
    } else {
      wx.navigateTo({
        url: "/pages/allArticle/allArticle?openid=" + openid,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    app.http(getMsgDetailApi, {
      messageId: options.messageId
    }).then(res => {
      that.setData({
        article: res.data,
        userInfo: app.globalData.userInfo
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})