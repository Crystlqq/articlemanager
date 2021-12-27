var express = require('express')
var app =  express()
var router = express.Router()
var model = require('../model')

router.get('/',function(req,res,next){
    model.connect(function(db){
        db.collection('user').find().toArray(function(err,docs){
            console.log('用户列表',docs)
            res.render('index',{title:'Express'})
        })
    })
})

//渲染注册的页面
router.get('/regist',function(req,res,next){
    res.render('regist',{})
})
//渲染登录的页面
router.get('/login',function(req,res,next){
    res.render('login',{})
})

// app.use("/",express.static('web'))
// app.get("/regist",(req,res)=>{
//     console.log(req.query)
//     //const kitty = new mydata({name:req.query.first,health:req.query.second})
//     //kitty.save()
//     res.send(req.query)
//     //ejs.renderFile(filename,data,options,function(err,str){
//         //str
//     //})
//     //ejs.renderFile("result.html",{returnVal:"success"},(err,str)=>{
//         //res.send(str)
//     //})

// })
// app.listen(60535)



module.exports = router