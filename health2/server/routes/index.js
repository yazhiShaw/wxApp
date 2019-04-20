const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

const userApi = require('../api/userApi.js')

// 首页（动态模块）的接口
const indexApi = require('../api/indexApi.js')

const adminApi = require('../api/adminApi.js')


// 公共接口
const publicApi = require('../api/publicApi.js')

// ------- 管理 -------
router.post('/admin/login', adminApi.login) // 登录
router.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, "app.get(superSecret)", function (err, decoded) {
            if (err) {
                return res.json({
                    code: 401,
                    message: 'token无效'
                })
            } else {
                req.decoded = decoded;
                next(); //继续下一步路由
            }
        });
    } else {
        // 没有拿到token 返回错误 
        return res.json({
            code: 401,
            message: '没有找到token'
        })
    }
});
router.get('/admin/getUser', adminApi.getAllUser) //获取微信用户信息
router.get('/admin/getMsg', adminApi.getAllMsg) //获取动态信息
router.post('/admin/delUser', adminApi.delUser) //删除用户信息
router.post('/admin/delMsg', adminApi.delMsg) //删除动态信息
router.get('/admin/getAct', adminApi.getAllAct) //获取活动信息
router.post('/admin/delAct', adminApi.delAct) //删除活动信息
router.post('/admin/actStatus', adminApi.actStatus) //活动审核

// ------- 公共接口 -------

router.get('/public/getMsg', publicApi.getMsg) // 获取动态

router.get('/public/getMsgDetail',publicApi.getMsgDetail) // 获取动态详情

router.get('/public/getAct',publicApi.getAct) // 获取活动列表

router.get('/public/getActDetail',publicApi.getActDetail) // 获取活动详情

router.get('/public/getFocus', publicApi.getFocus) // 我的关注

// ------- 微信登录 -------
router.get('/wx/getOpenid', userApi.getOpenid) //获取微信用户信息
router.get('/wx/updateUser', userApi.updateUser) // 更新微信用户信息

// ------- 首页(动态模块) -------
// router.get('/index/getNav',indexApi.getNav) // 获取消息分类信息（导航信息）
router.post('/index/addComment',indexApi.addComment) // 评论
router.post('/index/addLike',indexApi.addLike) // 点赞
router.post('/index/addMyCollect',indexApi.addMyCollect) // 收藏
router.post('/index/addFocus',indexApi.addFocus) // 关注
router.post('/index/addMsg',indexApi.addMsg) // 添加（发布）动态
router.post('/index/addPic',indexApi.addPic) // 添加（发布）照片
router.post('/index/addMyAct', indexApi.addMyAct) // 发起活动
router.post('/index/updateSign', indexApi.updateSign) // 发起活动
router.post('/index/delMsg', indexApi.delMsg) // 发起活动
// // ------- 发起活动模块 -------
// router.post('/act/joinAct',actApi.joinAct) // 加入活动


router.get('*', (req, res) => {
    res.json({
        code: -200,
        message: '没有找到该接口'
    })
})

module.exports = router