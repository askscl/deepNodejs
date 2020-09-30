//var WebSocket = require('WebSocket');
/* var socket = new WebSocket('ws://127.0.0.1:12010/updates');
socket.onopen = function(){
    setInterval(function(){
        if(socket.bufferedAmount == 0)
            socket.send(getUpdateData());
    }, 50);
};
socket.onmessage = function(event){
    //todo
}; */


//用Node模拟浏览器发起协议切换的行为
var http = require('http');
var WebSocket = function (url){
    //伪代码
    this.options = parseUrl(url);
    this.connect();
};
WebSocket.prototype.onopen = function(){
    //todo
};

WebSocket.prototype.setSocket = function (socket){
    this.socket = socket;
};

WebSocket.prototype.connect = function(){
    var that = this;
    var key = new Buffer(this.options.protocolVersion + '-' + Date.now()).toString('base64');
    var shasum = crypto.createHash('sha1');

    var expected = shasum.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');

    var options = {
        port: this.options.port,
        host: this.options.hostname,
        headers: {
            'Connection': 'Upgrade',
            'Upgrade': 'websocket',
            'Sec-WebSocket-Version': this.options.protocolVersion,
            'Sec-WebSocket-Key': key
        }
    };
    var req = http.request(options);
    req.end();

    req.on('upgrade', function(res, socket, upgradeHead){
        //连接成功
        that.setSocket(socket);
        that.onopen();
    });
};

//服务器端的响应行为：
var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});

server.listen(12010);

//在收到upgrade请求后，告之客户端允许切换协议
server.on('upgrade', function(req, socket, upgradeHead){
    var head = new Buffer(upgradeHead.length);
    upgradeHead.copy(head);
    var key = req.headers['sec-websocket-key'];
    var shasum = crypto.createHash('sha1');
    key = shasum.update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").digest('base64');
    var headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        'Sec-WebSocket-Accept:' + key,
        'Sec-WebSocket-Protocol:' + protocol
    ];
    //让数据立即发送
    socket.setNoDelay(true);
    socket.write(headers.concat('', '').join('\r\n'));

    //建立服务器端WebSocket连接
    var websocket = new WebSocket();
    websocket.setSocket(socket);
});



