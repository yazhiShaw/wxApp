var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var UserSchema = new Schema({
    openid: String,
    nickName: String,       //用户名称
    gender: {
        type: Number, 
        default: 1
    },       //用户性别，默认为1；1是男性，2是女性
    avatarUrl: String,       //用户头像
    // focus是根据当前用户关注列表改变而改变
    // focus: { // 0是自己，1是已关注，2是未关注
    //     type: Number,
    //     default: 0
    // },
    friendId: {
        type: Array,
        default: []
    },        // 关注的人
    // collect: Array,         // 收藏的文章
    createTime: String,
    updateTime: String,
    sign: {
        type: String,
        default: '无'
    },  // 个性签名
})

var User = mongoose.model('User', UserSchema)
Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)
module.exports = User
