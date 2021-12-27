var session = require('express-session')
var articleRouter = require('./routes/article')
//session的配置
app.use(session({
    secret:'qf project',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*5}//制定登录会话有效时长
}))

app.use('article',articleRouter)
//登录拦截
app.get('*',function(req,res,next){
    var username = req.session.username
    var path =req.path
    console.log('session',username)
    if(path!='/login'&&path!='/regist'){
        if(!username){
        res.redirect('/login')
     } 
    }
    next()
})