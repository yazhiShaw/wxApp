// pages/publish/publish.js
const app = getApp()
const { addMsgApi, addPicApi } = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: [],
    content: '',
    navId: 0
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

  },
  // 上传图片
  chooseImage: function () {
    // 选择图片
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const picUrl = this.data.picUrl.concat(res.tempFilePaths)
        this.setData({
          picUrl
        })
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    const picUrl = this.data.picUrl.splice(idx, 1);
    console.log(picUrl)
    // const images = that.data.images.splice(idx, 1);
    // // console.log('removeImage', idx)
    // this.setData({
    //   images
    // })
  },
  upload() {
    const picUrl = this.data.picUrl
    const token = wx.getStorageSync('token')
    return new Promise((resolve, reject) => {
      for (let i = 0; i < picUrl.length; i++) {
        wx.uploadFile({
          url: app.globalData.baseUrl + addPicApi, //服务器接口地址
          filePath: picUrl[i],
          name: 'file',
          header: {
            'x-access-token': token
          },
          success: res => {
            // console.log('第' + ｉ + '[uploadFile上传文件] 成功：', res)
            resolve(res.data)
          },
          fail: e => {
            wx.showToast({
              icon: 'none',
              title: '上传失败',
              duration: 1000
            })
            reject(e);
          },
          complete: () => {
          }
        })
      }
    })
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const picUrl = this.data.picUrl
    wx.previewImage({
      current: picUrl[idx],  //当前预览的图片
      urls: picUrl,  //所有要预览的图片
    })
  },
  contentInput: function (e) {
    this.setData({ content: e.detail });
  },
  chooseNavId: function(e){
    console.log(e)
    let that = this
    if (that.data.navId == e.currentTarget.dataset.navid){
      that.setData({
        navId: 0
      })
    }else{
      that.setData({
        navId: e.currentTarget.dataset.navid
      })
    }
  },
  // 发布
  publish: function () {
    // content, picUrl, navId = 0, avatarUrl, nickName, openid
    let that = this;
    let data = {
      content: that.data.content,
      navId: that.data.navId,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    }
    if (that.data.content != '') {
      if (that.data.picUrl.length){
        that.upload().then(result => {
          console.log('publish', result)
          app.http(addMsgApi, data, 'POST').then(res => {
            wx.showToast({
              title: '发布成功',
              duration: 1000
            })
            that.setData({
              content: '',
              picUrl: [],
              navId: 0
            })
            wx.switchTab({
              url: '/pages/index/index'
            })
          })
        })
      }else { //单纯发布文字不需要调用上传照片的接口
        app.http(addMsgApi, data, 'POST').then(res => {
          wx.showToast({
            title: '发布成功',
            duration: 1000
          })
          that.setData({
            content: '',
            navId: 0
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
        })
      }
    } else {
      wx.showToast({
        icon: 'none',
        title: '请输入要发表的内容',
      })
    }

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
    // wx.showModal({
    //   title: '提示',
    //   content: '当前页面内容还未发布，确认离开吗',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
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