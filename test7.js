//创建服务器端
/* var tls = require('tls');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
    requestCert: true,
    ca: [ fs.readFileSync('./keys/ca.crt')]
};

var server = tls.createServer(options, function(steam){
    console.log('server connected', stream.authorized ? 'authorized' : 'unauthorized');
    steam.write("welcome!\n");
    steam.setEncoding('utf8');
    steam.pipe(stream);
}); 

server.listen(8000, function(){
    console.log('server bound');
});*/

//创建客户端
/* var tls = require('tls');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./keys/client.key'),
    cert: fs.readFileSync('./keys/client.crt'),
    ca: [fs.readFileSync('./keys/ca.crt')]
};

var stream = tls.connect(8000, options, function(){
    console.log('client connected ' , steam.authorized ? 'authorized' : 'unauthorized');
    process.stdin.pipe(stream);
});

stream.setEncoding('utf8');

stream.on('data', function(data){
    console.log(data);
});

stream.on('end', function(){
    server.close();
}); */

//创建https服务
/* var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
};

https.createServer(options, function(req, res){
    res.writeHead(200);
    res.end("hello world\n");
}).listen(8000); */

var https = require('https');
var fs = require('fs');

var options = {
    hostname: 'localhost',
    port: 8000,
    path: '/',
    method: 'GET',
    key: fs.readFileSync('./keys/client.key'),
    cert: fs.readFileSync('./keys/client.crt'),
    ca: [fs.readFileSync('./keys/ca.crt')]
};

options.agent = new https.Agent(options);

var req = https.request(options, function(res){
    res.setEncoding('utf-8');
    res.on('data', function(d){
        console.log(d);
    });
});
req.end();

req.on('error', function(e){
    console.log(e);
});








