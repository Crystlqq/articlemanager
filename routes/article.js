var express = require('express');
var router = express.Router();
var model = require('../model')
/*Get users listing*/

router.post('/add',function(req,res,next){
    var data = {
        title:req.body.title,
        content:req.body.content,
        id:Date.now(),
        username:req.session.username
    }
    model.connect(function(db){
        db.collection('articles').insertOne(data,function(err,ret){
            if(err){
                console.log("文件发送出错拉",err)
                res.redirect('/write')
            }else{
                res.redirect('/')
            }
        })
    })
})


module.exports = router;