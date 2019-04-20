var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')
var MessageSchema = new Schema({
    content: String,            //消息内容
    picUrl: {                   //消息照片
        type: Array,
        default: [],
    },
    createTime: String,
    commentCount: {
        type: Number,
        default: 0,
    },
    comment: Array,
    likes: [],
    like: {
        type: Boolean,
        default: false
    },
    collects: [],
    collect: {
        type: Boolean,
        default: false
    },
    // focus是根据当前用户关注列表改变而改变
    focus: { // 0是自己，1是已关注，2是未关注
        type: Number,
        default: 0
    },
    navId: Number,           //所属类别编号（nav表）
    openid: String,       //所属用户编码（user表）
    nickName: String,       //用户名称
    avatarUrl: String,       //用户头像
})
var Message = mongoose.model('Message', MessageSchema)
Promise.promisifyAll(Message)
Promise.promisifyAll(Message.prototype)

module.exports = Message