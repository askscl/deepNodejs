/* var net = require('net');

var server = net.createServer(function(socket){
    socket.on('data', function(data){
        socket.write("你好");
    });

    socket.on('end', function(){
        console.log('连接断开');
    });

    socket.write("欢迎光临《深入浅出Node.js》示例：\n");

});

server.listen(8124, function(){
    console.log('server bound2');
}); */


/* var server = net.createServer();
server.on('connection', function(socket){

});
server.listen(8124); */

// server.listen('/tmp/echo.sock');

/* var net = require('net');
var client = net.connect({port:8124}, function(){
    console.log('client connected');
    client.write('world!\r\n');
});

client.on('data', function(data){
    console.log(data.toString());
    client.end();
});

client.on('end',function(){
    console.log('client disconnected');
}); */

/* var net = require('net');
var server = net.createServer(function(socket){
    socket.write('Echo server\r\n');
    socket.pipe(socket);
});

server.listen(1377, '127.0.0.1'); */

var dgram = require("dgram");

var server = dgram.createSocket("udp4");

server.on("message", function(msg, rinfo){
    console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
});

server.on("listening", function(){
    var address = server.address();
    console.log("server listening " + address.address + ":" + address.port);
});

server.bind(41234);

var message = new Buffer("深入浅出Node.js");
var client = dgram.createSocket("udp4");
client.send(message, 0, message.length, 41234, "localhos", function(err, bytes){
    client.close();
});



