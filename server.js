const express=require('express')
const http = require('http')
const path = require('path')
const fs = require('fs')
// const bodyParser = require('body-parser')
const file = './public/fileList.db'
const dbFile = fs.existsSync(file)
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(file, function() {
    if (!dbFile) {
        db.run("create table if not exists files(fileName varchar(1000) PRIMARY KEY)")
    }
})

const app=express()
// app.use(bodyParser.urlencoded({ extended: false }))
const hostname = '127.0.0.1'
const server= http.createServer(app)
const port = 8080

server.listen(port, function() {
    console.log(`服务器运行在 http://${hostname}:${port}/`)
})

app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();     
});

app.post('/file/fileCreate', function(req, res) {
    let data = []
    req.on('data',function(params){
        data += params
    })
    req.on('end', function() {
        let params = JSON.parse(data)
        const dataBuffer = new Buffer.from(params.file, 'base64')
        const files = './public/files'
        if (!fs.existsSync(files)) {
            fs.mkdirSync(files)
        }
        // 写入文件
        fs.writeFile(`public/files/${params.fileName}.txt`, dataBuffer, function(err) {
            if(err){
                res.send(err)
            }else{
                // 文件名保存在files表中
                const sql1 = db.prepare(`insert into files values ('${params.fileName}')`)
                sql1.run()
                console.log(sql1)
                res.send("保存成功！")
            }
        });
    })
})
app.put('/file/fileCreate', function(req, res) {
    let data = []
    req.on('data',function(params){
        data += params
    })
    req.on('end', function() {
        let params = JSON.parse(data)
        const dataBuffer = new Buffer.from(params.file, 'base64')
        fs.writeFile(`public/files/${params.fileName}.txt`, dataBuffer, function(err) {
            if(err){
                res.send(err)
            }else{
                res.send("保存成功！")
            }
        });
    })
})
app.get('/file/list', function(req, res) {
    const data = []
    // 从数据库中获取所有的文件名
    db.all('select * from files', function(error, row) {
        if (!error) {
            res.send(row)
        } else {
            res.send([])
        }
    })
})