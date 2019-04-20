const mongoose = require('../mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')

const LikeSchema = new Schema({
    openid: String,           // 所属用户编码（user表）
    messageId: mongoose.Types.ObjectId,       // 所属的消息编号（message表）
    like: {
        type: Boolean,
        default: false
    }
})

const Like = mongoose.model('Like', LikeSchema)
Promise.promisifyAll(Like)
Promise.promisifyAll(Like.prototype)

module.exports = Like