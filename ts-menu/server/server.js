
const express = require('express');
const userRouter = require('./user')
// Creat App
const bodyParser = require('body-parser');
const  { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.use('/api', createProxyMiddleware({ target: 'http:localhost:8000', changeOrigin: true }));
//这个链接是目标链接是我随便从网上找的一个


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/user',userRouter)
app.listen(8000, () => {
    return `server is running at port 8000 success~~~`;
})