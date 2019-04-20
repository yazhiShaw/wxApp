var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var NavSchema = new Schema({
    navId: {                //递增的类别编号
        type: Number, 
        default: 1, 
        index: true
    },     
    navName: String,        //类别名称
    // userId: Number,        //所属用户编码（user表）
})

var Nav = mongoose.model('Nav', NavSchema)
Promise.promisifyAll(Nav)
Promise.promisifyAll(Nav.prototype)

module.exports = Nav
