var mongoose = require('../mongoose')
var Schema = mongoose.Schema
var Promise = require('bluebird')

var AdminSchema = new Schema({
    username: String,
    password: String,
})

var Admin = mongoose.model('Admin', AdminSchema)
Promise.promisifyAll(Admin)
Promise.promisifyAll(Admin.prototype)

module.exports = Admin
