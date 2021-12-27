var express = require('express');
var session = require('express-session')
var articleRouter = require('./routes/article')
//session的配置
var app = express()
app.set('view engine', 'ejs')//将ejs集成到express中
app.use(session({
    secret:'qf project',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*5}//制定登录会话有效时长
}))

app.use('article',articleRouter)
//登录拦截
app.get('/',function(req,res){
    res.redirect('/login')
})
app.get('/login',function(req,res){
    res.render('login.ejs')
 })
app.listen(3000, (err) => {
    if(err) return console.log(err);
    console.log('3000 open')
})