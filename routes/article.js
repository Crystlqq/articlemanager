var express = require('express');
var router = express.Router();
var model = require('../model')
var multiparty = require('multiparty')
var fs = require('fs')
/*Get users listing*/
//新增文章，编辑
router.post('/add',function(req,res,next){
    var id = parseInt(req.body.id)
    if(id){//编辑
    var page = req.body.page
    var title = req.body.title
    var content  =req.body.content
    model.connect(function(db){
        db.collection('articles').updateOne({id:id},{$set:{
            title:title,
            content:content
        }},function(err,ret){
            if(err){
                console.log('修改失败')
            }else{
                console.log('修改成功')
                res.redirect('/?page='+page)
            }
        })
    })

    }else{
var data = {  //新增
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
    }
    
})
//删除文章
router.get('/delete',function(req,res,next){
    var id = parseInt(req.query.id)
    var page = req.query.page
    model.connect(function(db){
        db.collection('articles').deleteOne({id:id},function(err,ret){
            if (err){
                console.log('删除未成功')
            }else {
                console.log('删除成功')
            }
            res.redirect('/?page='+page)
        })
    })
})

//
router.post('/upload',function(req,res,next){
    var form = new multiparty.Form()
    form.parse(req,function(err,fields,files){
        if(err){
            console.log('上传失败',err)
        }else{
            console.log('文件列表',files)
            var file = files.filedata[0]
            var rs = fs.createReadStream(file.path)
            var newpath = '/uploads/'+file.originalFilename
            var ws = fs.createReadStream('./public'+newpath)
            rs.pipe(ws)
            ws.on('close',function(){
                console.log('文件上传成功')
                res.send({err:'',msg:newpath})
            })
        }
    })
})

module.exports = router;