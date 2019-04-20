var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CommentSchema = new Schema({
    content: String,           // 评论内容
    createTime: String,       // 评论时间
    openid: String,          // 评论者所属编码（user表）
    commentNickName: String,          // 评论者名字（user表）
    commentAvatarUrl: String,       //评论者头像
    messageId: mongoose.Types.ObjectId,       // 所属的消息编号（message表）
    toCommentId: String,           // 回复评论
})

var Comment = mongoose.model('Comment', CommentSchema)
Promise.promisifyAll(Comment)
Promise.promisifyAll(Comment.prototype)

module.exports = Comment
