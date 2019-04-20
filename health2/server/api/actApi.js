const moment = require('moment')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const mongoose = require('../mongoose')
const Act = mongoose.model('Act')
var multiparty = require('multiparty');
var ObjectId = mongoose.Types.ObjectId;
let picUrl = []
// /**
//  * 添加列表
//  * @method
//  * @param  {[type]} req [description]
//  * @param  {[type]} res [description]
//  * @return {[type]}     [description]
//  */
exports.addMyAct = (req, res) => {
    const { actTitle, actContent, actTime, actPlace, openid,nickName,name,avatarUrl,tel,Idcard } = req.body
    let data = {
        actTitle,
        actContent,
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        actTime,
        actPlace,
        openid,
        nickName,
        name,
        tel,
        avatarUrl,
        Idcard,
    }
    Act.createAsync(data)
        .then(result => {
            res.json({
                code: 200,
                message: '添加成功',
                data: result
            })
        })
        .catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
}