// const moment = require('moment')
const mongoose = require('../mongoose')
const Message = mongoose.model('Message')
const Comment = mongoose.model('Comment')
const User = mongoose.model('User')
const Act = mongoose.model('Act')
var ObjectId = mongoose.Types.ObjectId;

// 获取动态列表
exports.getMsg = (req, res) => {
    // sort = sort || 'createTime'
    let { limit, page, navId, openid, act, oneOpenid, focus } = req.query
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    const skip = (page - 1) * limit
    if (act === 'findMyActicles') {
        Promise.all([
            Message
                .find({ openid: oneOpenid })
                .sort({ createTime: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            Message.estimatedDocumentCountAsync({ openid: oneOpenid }),
            User.findOne({ openid: oneOpenid })
        ])
            .then(result => {
                console.log(result[0][0].openid, openid)
                for (let i = 0; i < result[0].length; i++) {
                    // 如果文章的作者和当前作者相同，那么focus为0
                    if (result[0][i].openid == openid) {
                        result[0][i]['focus'] = 0;
                    } else {
                        // 等于-1就是没有关注,focus为2，不等于-1就是已关注,focus为1
                        if (result[2].friendId.indexOf(result[0][i].openid) == -1) {
                            result[0][i]['focus'] = 2;
                        } else {
                            result[0][i]['focus'] = 1;
                        }
                    }
                }
                const total = result[1]
                const totalPage = Math.ceil(total / limit)
                const json = {
                    code: 200,
                    data: {
                        list: result[0],
                        userInfo: result[2],
                        total,
                        focus,
                        page,
                        hasNext: totalPage > page ? 1 : 0,
                        hasPrev: page > 1 ? 1 : 0
                    }
                }
                res.json(json)
            })
            .catch(err => {
                res.json({
                    code: -200,
                    message: err.toString()
                })
            })
    } else if (act === 'findMyCollect') { //我的收藏列表
        Promise.all([
            Message
                .find({ collects: { $in: openid } })
                .sort({ createTime: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            Message.estimatedDocumentCountAsync({ collects: { $in: openid } }),
            User.findOne({ openid })
        ])
            .then(result => {
                for(let i= 0;i< result[0].length;i++){
                    // 如果文章的作者和当前作者相同，那么focus为0
                    if(result[0][i].openid == openid){
                        result[0][i]['focus'] = 0;
                    }else {
                        // 等于-1就是没有关注,focus为2，不等于-1就是已关注,focus为1
                        if(result[2].friendId.indexOf(result[0][i].openid) == -1){
                            result[0][i]['focus'] = 2;
                        }else {
                            result[0][i]['focus'] = 1;
                        }
                    }
                }
                const total = result[1]
                const totalPage = Math.ceil(total / limit)
                const json = {
                    code: 200,
                    data: {
                        list: result[0],
                        page,
                        total,
                        hasNext: totalPage > page ? 1 : 0,
                        hasPrev: page > 1 ? 1 : 0
                    }
                }
                res.json(json)
            })
            .catch(err => {
                res.json({
                    code: -200,
                    message: err.toString()
                })
            })
    } else {
        if(navId == 0){
            Promise.all([
                Message
                    .find()
                    .sort({ createTime: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec(),
                Message.estimatedDocumentCountAsync(),
                User.findOne({ openid })
            ])
                .then(result => {
                    for(let i= 0;i< result[0].length;i++){
                        // 如果文章的作者和当前作者相同，那么focus为0
                        if(result[0][i].openid == openid){
                            result[0][i]['focus'] = 0;
                        }else {
                            // 等于-1就是没有关注,focus为2，不等于-1就是已关注,focus为1
                            if(result[2].friendId.indexOf(result[0][i].openid) == -1){
                                result[0][i]['focus'] = 2;
                            }else {
                                result[0][i]['focus'] = 1;
                            }
                        }
                    }
                    const total = result[1]
                    const totalPage = Math.ceil(total / limit)
                    const json = {
                        code: 200,
                        data: {
                            list: result[0],
                            page,
                            total,
                            hasNext: totalPage > page ? 1 : 0,
                            hasPrev: page > 1 ? 1 : 0
                        }
                    }
                    res.json(json)
                })
                .catch(err => {
                    res.json({
                        code: -200,
                        message: err.toString()
                    })
                })
        } else {
            Promise.all([
                Message
                    .find({ navId })
                    .sort({ createTime: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec(),
                Message.estimatedDocumentCountAsync({ navId }),
                User.findOne({ openid })
            ])
                .then(result => {
                    for(let i= 0;i< result[0].length;i++){
                        // 如果文章的作者和当前作者相同，那么focus为0
                        if(result[0][i].openid == openid){
                            result[0][i]['focus'] = 0;
                        }else {
                            // 等于-1就是没有关注,focus为2，不等于-1就是已关注,focus为1
                            if(result[2].friendId.indexOf(result[0][i].openid) == -1){
                                result[0][i]['focus'] = 2;
                            }else {
                                result[0][i]['focus'] = 1;
                            }
                        }
                    }
                    const total = result[1]
                    const totalPage = Math.ceil(total / limit)
                    const json = {
                        code: 200,
                        data: {
                            list: result[0],
                            page,
                            total,
                            hasNext: totalPage > page ? 1 : 0,
                            hasPrev: page > 1 ? 1 : 0
                        }
                    }
                    res.json(json)
                })
                .catch(err => {
                    res.json({
                        code: -200,
                        message: err.toString()
                    })
                })
            }
    }
}
// 获取动态详情
exports.getMsgDetail = (req, res) => {
    let { messageId } = req.query
    Promise.all([
        Comment.find({ messageId: ObjectId(messageId) }).sort({ createTime: -1 }),
        Message.findOne({ _id: ObjectId(messageId) }),
    ]).then(result => {
        result[1].comment = result[1].comment.concat(result[0])
        res.json({
            code: 200,
            message: 'success',
            data: result[1]
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}
// 获取活动列表
exports.getAct = (req, res) => {
    // sort = sort || 'createTime'
    let { navId, page, limit, openid, checkFlag } = req.query
    page = parseInt(page, 10)
    limit = parseInt(limit, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    const skip = (page - 1) * limit
    if (navId == 1) {
        Promise.all([
            Act
                .find({ openid })
                .sort({ createTime: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            Act.estimatedDocumentCountAsync(),
        ])
            .then(result => {
                const total = result[1]
                const totalPage = Math.ceil(total / limit)
                const json = {
                    code: 200,
                    data: {
                        list: result[0],
                        page,
                        total,
                        hasNext: totalPage > page ? 1 : 0,
                        hasPrev: page > 1 ? 1 : 0
                    }
                }
                res.json(json)
            })
            .catch(err => {
                res.json({
                    code: -200,
                    message: err.toString()
                })
            })
    }else if(checkFlag && checkFlag != -1){
        Promise.all([
            Act
                .find({checkFlag})
                .sort({ createTime: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            Act.estimatedDocumentCountAsync(),
        ])
            .then(result => {
                const total = result[1]
                const totalPage = Math.ceil(total / limit)
                const json = {
                    code: 200,
                    data: {
                        list: result[0],
                        page,
                        total,
                        hasNext: totalPage > page ? 1 : 0,
                        hasPrev: page > 1 ? 1 : 0
                    }
                }
                res.json(json)
            })
            .catch(err => {
                res.json({
                    code: -200,
                    message: err.toString()
                })
            })
    } else {
        Promise.all([
            Act
                .find({checkFlag: 1})
                .sort({ createTime: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            Act.estimatedDocumentCountAsync({ checkFlag: 1 }),
        ])
            .then(result => {
                const total = result[1]
                const totalPage = Math.ceil(total / limit)
                const json = {
                    code: 200,
                    data: {
                        list: result[0],
                        page,
                        total,
                        hasNext: totalPage > page ? 1 : 0,
                        hasPrev: page > 1 ? 1 : 0
                    }
                }
                res.json(json)
            })
            .catch(err => {
                res.json({
                    code: -200,
                    message: err.toString()
                })
            })
    }
}
// 获取活动详情
exports.getActDetail = (req, res) => {
    let { actId } = req.query
    Act.findOne({ _id: ObjectId(actId) }).then(result => {
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
// 获取我的收藏列表
exports.getMyCollects = (req, res) => {
    let { openid } = req.query
    Message.find({ 'collects.openid': openid }).then(result => {
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
// 获取我的关注列表
exports.getFocus = (req, res) => {
    let { openid } = req.query
    User.findOne({ openid }).then(result => {
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
