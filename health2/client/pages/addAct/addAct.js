const app = getApp()
const { addMyActApi, addPicApi } = require('../../api/api.js')
const { formatTime } = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: [],
    actTitle: '',
    actContent: '',
    actTime: '',
    actPlace: '',
    name: '',
    tel: '',
    Idcard: '',
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 10, 1).getTime(),
    show: false
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
  pop() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onComfirm(event) {
    let that = this
    let actTime = formatTime(new Date(event.detail))
    that.setData({
      show: false,
      actTime
    });
  },
  titleInput: function (e) {
    this.setData({ actTitle: e.detail });
  },
  contentInput: function (e) {
    this.setData({ actContent: e.detail });
  },
  placeInput: function (e) {
    this.setData({ actPlace: e.detail });
  },
  telInput: function (e) {
    this.setData({ tel: e.detail });
  },
  nameInput: function (e) {
    this.setData({ name: e.detail });
  },
  IdcardInput: function (e) {
    this.setData({ Idcard: e.detail });
  },
  // 上传图片
  chooseImage: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
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
  addAct: function(){
    let that = this
    if (!that.data.actTitle || !that.data.actContent || !that.data.actTime || !that.data.actPlace || !that.data.name || !that.data.tel || !that.data.Idcard){
      wx.showToast({
        title: '请填写完整活动消息',
        icon: 'none',
        duration: 800
      })
      return false
    }
    if (that.data.picUrl.length == 0){
      wx.showToast({
        title: '请上传活动群聊二维码',
        icon: 'none',
        duration: 800
      })
      return false
    }
    if (!(/^1[34578]\d{9}$/.test(that.data.tel))) {//手机号  正则匹配
      wx.showToast({
        title: '请正确填写手机号码',
        icon: 'none',
        duration: 800
      })
      return false
    }
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(that.data.Idcard))) {//身份证号码  正则匹配
      wx.showToast({
        title: '请正确填写身份证号码',
        icon: 'none',
        duration: 800
      })
      return false
    }
    let data = {
      actTitle: that.data.actTitle,
      actContent: that.data.actContent,
      actTime: that.data.actTime,
      actPlace: that.data.actPlace,
      name: that.data.name,
      tel: that.data.tel,
      Idcard: that.data.Idcard,
      nickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl,
    }
    that.upload().then(result => {
      console.log(result)
      app.http(addMyActApi, data , 'POST').then(res => {
        console.log(res)
        if(res.code === 200){
          wx.showToast({
            icon: 'none',
            title: '活动提交成功，请等待审核',
            duration: 1500
          })
          wx.navigateTo({
            url: '/pages/act/act',
          })
        }
        else {
          wx.showToast({
            title: '服务繁忙，请稍后再试',
            duration: 1500
          })
        }
      })
    })
  },
  upload() {
    const picUrl = this.data.picUrl
    return new Promise((resolve, reject) => {
      for (let i = 0; i < picUrl.length; i++) {
        wx.uploadFile({
          url: app.globalData.baseUrl + addPicApi,                  //服务器接口地址
          filePath: picUrl[i],
          name: 'file',
          success: res => {
            console.log('[uploadFile上传文件] 成功：', res)
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