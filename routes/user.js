const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const User = require('../mongoDB/user');
const sha1 = require('sha1');

router.get('/', function (req,res,next) {
    res.render('index');
    res.json(req.session.user)
});

router.get('/init', function (req, res, next) {
    let data = req.sendData;
    if (req.session.user) {
        data.data = req.session.user;
    } else {
        data.code = -1;
        data.msg = '未登录';
    }
    res.json(data);
    next();
});

router.post('/signIn', function (req, res, next) {
    let data = req.sendData;
    const Email = req.body.Email;
    const password = req.body.password;
    try {
        if (!(/.+@.+\..{2,}$/.test(Email))) {
            throw new Error('邮箱输入格式不正确');
        }
        if (password < 6) {
            throw new Error('密码不能少于6位');
        }
    } catch (e) {
        data.msg = e.message;
        data.code = -1;
        res.json(data);
    }
    User.getUserInfo(Email).then(function (user) {
        if (!user) {
            data.msg = '用户不存在';
            data.code = -1;
            res.json(data);
        }
        if (sha1(password) !== user.password) {
            data.msg = '用户名或密码错误';
            data.code = -1;
            res.json(data)
        }
        data.msg = '登陆成功!';
        delete user.password;
        data.data = user;
        res.json(data);
        req.session.user = data.data;
    })
        .catch(next)
});

module.exports = router;