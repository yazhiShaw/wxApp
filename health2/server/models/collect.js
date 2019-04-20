var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var CollectSchema = new Schema({
    collectId: Number,           //递增的收藏编号
    userId: Number,          //所属用户编码（user表）
    messageId: Number,       //所属的消息编号（message表）
})

var Collect = mongoose.model('Collect', CollectSchema)
Promise.promisifyAll(Collect)
Promise.promisifyAll(Collect.prototype)

module.exports = Collect
