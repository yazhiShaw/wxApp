// const moment = require('moment')
const mongoose = require('../mongoose')
const User = mongoose.model('User')
const Message = mongoose.model('Message')
const Act = mongoose.model('Act')
const Admin = mongoose.model('Admin')
var ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
// 登录
exports.login = (req, res) => {
    const { username, password } = req.body
    Admin.findOne({ username, password}).then(result => {
       
        if (result) {
        	 var token = jwt.sign(result.toJSON(), 'app.get(superSecret)', {
            'expiresIn': 60*60*24 // 设置过期时间
        });

            res.json({
                code: 200,
                message: '登录成功',
                token: token
            })
        } else {
            res.json({
                code: 401,
                message: '密码或账号错误'
            })
        }
        
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}
exports.getAllUser = (req, res) => {
    let { pagesize, curpage, nickName } = req.query
    page = parseInt(curpage, 10)
    limit = parseInt(pagesize, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    const skip = (page - 1) * limit
    if(nickName){
        var reg = new RegExp(nickName,'i');
        Promise.all([
        User
            .find({nickName:{$regex : reg}})
            .sort({ createTime: -1 })
            .skip(skip)
            .limit(limit)
            .exec(),
        User.countDocuments({nickName:{$regex : reg}}),
    ])
        .then(result => {
            const total = result[1]
            const totalPage = Math.ceil(total / limit)
            const json = {
                code: 200,
                data: {
                    list: result[0],
                    total,
                    hasNext: totalPage > page ? 1 : 0,
                    hasPrev: page > 1 ? 1 : 0
                }
            }
            res.json(json)
        })
        .catch(err => {
            console.log(err.toString(), 'err')
            res.json({
                code: -200,
                message: err.toString()
            })
        })
    }else {
        Promise.all([
        User
            .find()
            .sort({ createTime: -1 })
            .skip(skip)
            .limit(limit)
            .exec(),
        User.countDocuments(),
    ])
        .then(result => {
            const total = result[1]
            const totalPage = Math.ceil(total / limit)
            const json = {
                code: 200,
                data: {
                    list: result[0],
                    total,
                    hasNext: totalPage > page ? 1 : 0,
                    hasPrev: page > 1 ? 1 : 0
                }
            }
            res.json(json)
        })
        .catch(err => {
            console.log(err.toString(), 'err')
            res.json({
                code: -200,
                message: err.toString()
            })
        })
    }
    
}
exports.getAllMsg = (req, res) => {
    let { pagesize, curpage, content, navId } = req.query
    page = parseInt(curpage, 10)
    limit = parseInt(pagesize, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    const skip = (page - 1) * limit
    if(content) {
        var reg = new RegExp(content,'i');
        Promise.all([
        Message
            .find({content:{$regex : reg}})
            .sort({ createTime: -1 })
            .skip(skip)
            .limit(limit)
            .exec(),
        Message.countDocuments({content:{$regex : reg}}),
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
            console.log(err.toString(), 'err')
            res.json({
                code: -200,
                message: err.toString()
            })
        })
    } else if (navId && navId != 0) {
        Promise.all([
            Message
                .find({ navId })
                .sort({ createTime: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            Message.countDocuments(),
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
                console.log(err.toString(), 'err')
                res.json({
                    code: -200,
                    message: err.toString()
                })
            })
    }else {
        Promise.all([
        Message
            .find()
            .sort({ createTime: -1 })
            .skip(skip)
            .limit(limit)
            .exec(),
        Message.countDocuments(),
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
            console.log(err.toString(), 'err')
            res.json({
                code: -200,
                message: err.toString()
            })
        })
    }
    
}
exports.getAllAct = (req, res) => {
    let { pagesize, curpage, actTitle, checkFlag } = req.query
    page = parseInt(curpage, 10)
    limit = parseInt(pagesize, 10)
    if (!page) page = 1
    if (!limit) limit = 10
    const skip = (page - 1) * limit
    if(actTitle){
        var reg = new RegExp(actTitle,'i');
        Promise.all([
        Act
            .find({actTitle:{$regex : reg}})
            .sort({ createTime: -1 })
            .skip(skip)
            .limit(limit)
            .exec(),
        Act.countDocuments({actTitle:{$regex : reg}}),
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
            console.log(err.toString(), 'err')
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
            Act.countDocuments(),
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
    }else {
        Promise.all([
        Act
            .find()
            .sort({ createTime: -1 })
            .skip(skip)
            .limit(limit)
            .exec(),
        Act.countDocuments(),
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
            console.log(err.toString(), 'err')
            res.json({
                code: -200,
                message: err.toString()
            })
        })
    }
}
exports.delUser = (req, res) => {
    const { openid } = req.body
    User.remove({ openid }).then(result => {
            res.json({
                code: 200,
                message: '删除成功'
            })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}
exports.delMsg = (req, res) => {
    const { _id } = req.body
    Message.remove({ _id: ObjectId(_id) }).then(result => {
        res.json({
            code: 200,
            message: 'delete message success'
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}
exports.delAct = (req, res) => {
    const { _id } = req.body
    Act.remove({ _id: ObjectId(_id) }).then(result => {
            res.json({
                code: 200,
                message: 'delete act success'
            })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}
exports.delMsg = (req, res) => {
    const { _id } = req.body
    Message.remove({ _id: ObjectId(_id) }).then(result => {
        res.json({
            code: 200,
            message: 'delete message success'
        })
    }).catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}
exports.actStatus = (req, res) => {
    const { actId, checkFlag } = req.body
    Act.findOneAndUpdateAsync(
        { _id: ObjectId(actId) }, 
        { checkFlag },
         { new: true }).then(result => {
            res.json({
                code: 200,
                message: 'act change success'
            })
        }).catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })
}
