var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var FocusSchema = new Schema({
    focusId: Number,           //递增的关注编号
    userId: Number,          //所属用户编码（user表）
    friendId: Number,       //关注的用户编号（user表）
})

var Focus = mongoose.model('Focus', FocusSchema)
Promise.promisifyAll(Focus)
Promise.promisifyAll(Focus.prototype)

module.exports = Focus
