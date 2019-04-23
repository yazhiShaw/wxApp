const app = getApp()
const { addLikeApi, getMsgApi } = require('../../api/api.js')

Component({
  properties: {
    act: {
      type: Object,
      value: {
        content: '测试内容'
      }
    },
    navId: {
      type: Number,
      value: 0
    }
  },
  data: {
    noneImg: "../../images/none.jpg",
  },
  onLoad: function() {
    
  },
  methods: {
    // 文章详情
    toActDetail: function (e) {
      let that = this
      const actId = e.currentTarget.dataset.actid
      let navId = that.data.navId
      wx.navigateTo({
        url: "/pages/actDetail/actDetail?actId=" + actId + '&navId='+ navId,
      })
    },
  }
})