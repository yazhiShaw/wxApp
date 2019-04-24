const app = getApp()
const {
  addLikeApi,
  getMsgApi,
  addMyCollectApi,
  addFocus,
  delMsg
} = require('../../api/api.js')
const {
  getCurrentPageUrl
} = require('../../utils/util.js')
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: true
    },
    navId: {
      type: Number,
      value: 0
    },
    // 0 是代表自己 1是代表别人已关注 2是未关注
    article: {
      type: Object,
      value: {
        content: '测试内容',
        focus: 1
      }
    },
    active: {
      type: Number,
      value: 0
    },
  },
  data: {
    // tabs: [' 标签1', '标签2']
    basePicUrl: app.globalData.basePicUrl,
    like: false,
    noneImg: "../../images/none.jpg",
    navName: ['养生推荐', '佛系健康', '佛系美容', '佛系美食', '佛系茶道'],
  },
  onLoad: function () {

  },
  methods: {
    // 文章详情
    toActicleDetail: function (e) {
      const messageId = e.currentTarget.dataset.messageid
      wx.navigateTo({
        url: "/pages/acticle/acticle?messageId=" + messageId,
      })
    },
    
    chooseTab: function (e) {
      let that = this
      that.setData({
        navId: e.currentTarget.dataset.navid
      })
      this.triggerEvent('myevent', { active: e.currentTarget.dataset.navid });
    },
    addLike: function (e) {
      let that = this
      // const like = !e.currentTarget.dataset.like
      const messageId = e.currentTarget.dataset.messageid
      const pageUrl = getCurrentPageUrl()
      let data = ''
      if (pageUrl === 'pages/index/index') {
        data = {
          navId: that.data.navId
        }
      } else if (pageUrl === 'pages/my/my' || pageUrl === 'pages/allArticle/allArticle') {
        data = {
          act: 'findMyActicles'
        }
      } else if (pageUrl === 'pages/myCollect/myCollect') {
        data = {
          act: 'findMyCollect'
        }
      }
      app.http(addLikeApi, {
        messageId
      }, 'POST').then(res => {
        if (res.code === 200) {
          // 在首页要传navId
          app.http(getMsgApi, data).then(res => {
            that.setData({
              article: res.data.list
            })
          })
        }
      })
    },
    addCollect: function (e) {
      let that = this
      const messageId = e.currentTarget.dataset.messageid
      const collect = e.currentTarget.dataset.collect
      const pageUrl = getCurrentPageUrl()
      let data = ''
      if (pageUrl === 'pages/index/index') {
        data = {
          navId: that.data.navId
        }
      } else if (pageUrl === 'pages/my/my' || pageUrl === 'pages/allArticle/allArticle') {
        data = {
          act: 'findMyActicles'
        }
      } else if (pageUrl === 'pages/myCollect/myCollect') {
        data = {
          act: 'findMyCollect'
        }
      }
      // 取消收藏
      if (collect) {
        wx.showModal({
          title: '提示',
          content: '确定取消收藏吗？',
          success: function (res) {
            if (res.confirm) {
              app.http(addMyCollectApi, {
                messageId
              }, 'POST').then(res => {
                if (res.code === 200) {
                  app.http(getMsgApi, data).then(res => {
                    that.setData({
                      article: res.data.list
                    })
                  })
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        // 点击收藏
        app.http(addMyCollectApi, {
          messageId
        }, 'POST').then(res => {
          if (res.code === 200) {
            app.http(getMsgApi, data).then(res => {
              that.setData({
                article: res.data.list
              })
            })
          }
        })
      }
    },
    toDel: function (e) {
      let that = this
      const messageId = e.currentTarget.dataset.messageid
      const pageUrl = getCurrentPageUrl()
      const oneOpenid = app.globalData.openid || wx.getStorageSync('openid')
      let data = ''
      if (pageUrl === 'pages/index/index') {
        data = {
          navId: that.data.navId
        }
      } else if (pageUrl === 'pages/my/my' || pageUrl === 'pages/allArticle/allArticle') {
        data = {
          act: 'findMyActicles',
          oneOpenid
        }
      } else if (pageUrl === 'pages/myCollect/myCollect') {
        data = {
          act: 'findMyCollect'
        }
      }
      wx.showModal({
        title: '提示',
        content: '确定删除吗？',
        success: function (res) {
          if (res.confirm) {
            app.http(delMsg, { messageId }, 'POST').then(res => {
              if (res.code === 200) {
                wx.showToast({
                  title: '删除成功',
                  duration: 1500
                })
                app.http(getMsgApi, data).then(res => {
                  that.setData({
                    article: res.data.list
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
    toFocus: function (e) {
      let that = this
      const friendId = e.currentTarget.dataset.friendid
      const avatarUrl = e.currentTarget.dataset.avatarurl
      const nickName = e.currentTarget.dataset.nickname
      const focus = e.currentTarget.dataset.focus
      const pageUrl = getCurrentPageUrl()
      let data = ''
      if (pageUrl === 'pages/index/index') {
        data = {
          navId: that.data.navId
        }
      } else if (pageUrl === 'pages/my/my' || pageUrl === 'pages/allArticle/allArticle') {
        data = {
          act: 'findMyActicles'
        }
      } else if (pageUrl === 'pages/myCollect/myCollect') {
        data = {
          act: 'findMyCollect'
        }
      }
      // 取消关注
      if (focus) {
        wx.showModal({
          title: '提示',
          content: '确定取消关注吗？',
          success: function (res) {
            if (res.confirm) {
              app.http(addFocus, { friendId }, 'POST').then(res => {
                if (res.code === 200) {
                  app.http(getMsgApi, data).then(res => {
                    that.setData({
                      article: res.data.list
                    })
                  })
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        app.http(addFocus, { friendId, nickName, avatarUrl }, 'POST').then(res => {
          if (res.code === 200) {
            app.http(getMsgApi, data).then(res => {
              that.setData({
                article: res.data.list
              })
            })
          }
        })
      }
    },
    // 点击头像跳到对应的所有文章列表
    toOneArticle: function(e){
      const openid = e.currentTarget.dataset.openid
      if (openid == app.globalData.openid){
        wx.switchTab({
          url: "/pages/my/my",
        })
      }else {
        wx.navigateTo({
          url: "/pages/allArticle/allArticle?openid=" + openid,
        })
      }
    },
    toPreviewImage: function (e) {
      var currentSrc = e.currentTarget.dataset.src;
      wx.previewImage({
        current: currentSrc, // 当前显示图片的http链接
        urls: [currentSrc] // 需要预览的图片http链接列表
      })
    },
  }
})