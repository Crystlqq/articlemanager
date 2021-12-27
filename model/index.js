var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
var dbName = 'project'
//连接数据库
function connect(callback){
    MongoClient.connect(url,function(err,client){
        if(err){
            console.log("数据库出错啦",err)
        }else{
        var db = client.db(dbName)
        callback && callback(db)
        client.close()
        }
    })
}

module.exports={
    connect
}