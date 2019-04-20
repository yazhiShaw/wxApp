var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var ActSchema = new Schema({
    actTitle: String,          //活动主题
    actContent: String,        //活动内容
    createTime: String,       // 活动发布时间
    actTime: String,          // 活动开始时间
    actPlace: String,       //活动举办地点
    openid: String,          // 活动发起人所属编码（user表）
    nickName: String,          // 活动发起人名字
    avatarUrl: String,          // 活动发起人名字
    name: String,          // 活动发起人真实名字
    tel: String,          // 活动发起人真实名字
    Idcard: String,            //活动发起人的身份证
    checkFlag: {
        type: Number,
        default: 0
    },            // 是否经过审核，0是未审核，1是审核已通过，2是审核未通过
    actPic: {                   //消息照片
        type: Array,
        default: [],
    },
})

var Act = mongoose.model('Act', ActSchema)
Promise.promisifyAll(Act)
Promise.promisifyAll(Act.prototype)

module.exports = Act
