var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/health', { useNewUrlParser: true }) //服务器
// mongoose.connect('mongodb://admin:liujiexian@127.0.0.1:27017/health', { useNewUrlParser: true }) //服务器
mongoose.Promise = global.Promise
module.exports = mongoose
