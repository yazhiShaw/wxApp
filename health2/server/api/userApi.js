// const moment = require('moment')
const mongoose = require('../mongoose')
const request = require('request');
const config = require('../config')
const moment = require('moment')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken');
/**
 * 微信根据code回去用户信息
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getOpenid = (req, res) => {
    let { code } = req.query
    // userInfo = JSON.parse(userInfo)
    let urlStr = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + config.AppID + '&secret=' + config.Secret + '&js_code=' + code + '&grant_type=authorization_code';
    request(urlStr, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let data = JSON.parse(body)
            var token = jwt.sign({ openid: data.openid }, 'app.get(superSecret)', {
                'expiresIn': 60 * 60 * 24 // 设置过期时间
            });
            User.findOne({ openid: data.openid }).then(user => {
                if (!user) {
                    User.createAsync({
                        openid: data.openid,
                        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                        updateTime: moment().format('YYYY-MM-DD HH:mm:ss')
                    }).then(result => {
                        res.json({
                            code: 200,
                            message: '获取openid成功',
                            data: {
                                openid: data.openid,
                                token: token
                            }
                        })
                    }).catch(err => {
                        console.log('err1', err)
                        res.json({
                            code: -200,
                            message: err.toString(),
                            data
                        })
                    })
                } else {
                    res.json({
                        code: 200,
                        message: 'login success',
                        data: {
                            token: token,
                            openid: data.openid
                        }
                    })
                }
            })
        } else {
            console.log('err2', err)
            res.json({
                code: -200,
                data: error
            })
        }
    })
}
exports.updateUser = (req, res) => {
    let { openid, userInfo } = req.query
    userInfo = JSON.parse(userInfo)
    User.findOneAndUpdateAsync({ openid }, {
        nickName: userInfo.nickName,
        gender: userInfo.gender,
        avatarUrl: userInfo.avatarUrl,
        updateTime: moment().format('YYYY-MM-DD HH:mm:ss')
    }, { new: true }).then(result => {
        res.json({
            code: 200,
            message: 'success',
            data: result
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}