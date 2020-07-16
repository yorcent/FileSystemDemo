const http = require('http')
const express=require('express')
const path = require('path')
const fs = require('fs')
const url = require('url')

const app=express()
const hostname = '127.0.0.1'
const port = 8080
const server= http.createServer(app);
// 创建服务
// const server = http.createServer(function (request, response) {
//     debugger
//     // 获得URL的path
//     const pathname = url.parse(request.url).pathname;
//     // 获得对应的本地文件路径
//     const filepath = path.join(root, pathname);
//     console.log('pathname', pathname, filepath)
//     // 获取文件状态:
//     fs.stat(filepath, function (err, stats) {
//         if (!err && stats.isFile()) {
//             // 没有出错并且文件存在:
//             console.log('200 ' + request.url);
//             response.writeHead(200);
//             // 将文件流导向response:
//             fs.createReadStream(filepath).pipe(response);
//         } else {
//             // 出错了或者文件不存在:
//             console.log('404 ' + request.url);
//             // 发送404响应:
//             response.writeHead(404);
//             response.end('404 Not Found');
//         }
//     });
// });

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
    // res.setHeader("Access-Control-Allow-Origin","*");
    debugger
    req.on('data',function(data){
        const obj=JSON.parse(data);
        console.log(obj);
        res.send('success')
    })
  })
app.get('/', function(req, res) {
    res.end('');
})