const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const { scheduleCoupon } = require('./utils')

// body 解析中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// cookie 解析中间件
app.use(cookieParser())

// 引入 mongoose 相关模型
require('./models/admin')
require('./models/user')
require('./models/message')
require('./models/act')
require('./models/comment')
// require('./models/collect')
require('./models/like')
// require('./models/focus')

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

//图片文件
app.get('/file/images/*', function (req, res) {
    res.sendFile(__dirname + "/" + req.url)
})

// 引入 api 路由
const routes = require('./routes/index')
// api 路由
app.use('/api', routes)

//配置服务端口
const server = app.listen(8082, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('host:' + host, 'port:' + port);
})