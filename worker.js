var http = require('http');
var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('handled by child, pid is ' + process.pid + '\n');
    throw new Error('throw exception');
});

var worker;
process.on('message', function(m, tcp){
    if(m === 'server'){
        worker = tcp;
        worker.on('connection', function(select){
            server.emit('connection', socket);
        });
    }
});

process.on('uncaughtException', function(err){
    //记录日志
    logger.error(err);
    //发送自杀信号
    process.send({act: 'suicide'});
    //停止接收新的连接
    worker.close(function(){
        //所有已连接断开后，退出进程
        process.exit(1);
    });
    //5秒后退出进程
    setTimeout(function(){
        process.exit(1);
    },5000);
});
