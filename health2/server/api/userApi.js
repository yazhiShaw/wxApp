// const moment = require('moment')
const mongoose = require('../mongoose')
const request = require('request');
const config = require('../config')
const moment = require('moment')
const User = mongoose.model('User')
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
            User.createAsync({
                openid: data.openid,
                createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                updateTime: moment().format('YYYY-MM-DD HH:mm:ss')
                // nickName: userInfo.nickName,       //用户名称
                // gender: userInfo.gender,      //用户性别，默认为1；1是男性，2是女性
                // avatarUrl: userInfo.avatarUrl,
            }).then(result => {
                res.json({
                    code: 200,
                    message: '获取openid成功',
                    data: {
                        openid: data.openid,
                        session_key: data.session_key
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

        }else {
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