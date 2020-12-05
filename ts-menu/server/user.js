const express = require('express')
// 生成express路由中间件
const Router = express.Router();
// CheckLogin.js 用户查询用户是否登录的接口
Router.get('/info', (req, res) => {
    return res.json({code: 1,msg: '未登录'})
});

Router.post('/login',  (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    if(username === "admin" && password === "password") {
        return res.json({
            code: 200,
            msg: "Login Success"
        })
    } else {
        return res.json({
            code: 200,
            msg: "Username or password error"
        })
    }

})
module.exports = Router