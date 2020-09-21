/* var leakArray = [];
var leak = function(){
    leakArray.push("lek" + Math.random());
};

http.createServer(function(req, res){
    leak();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listem(1337);

console.log('Server running at http://127.0.0.1:1337');

//==================================================
var memwatch = require('memwatch');
memwatch.on('leak', function(info){
    console.log('leak:');
    console.log(info);
});

memwatch.on('stats', function(stats){
    console.log('stats:');
    console.log(stats);
});

var http = require('http');

var leakArray = [];
var leak = function(){
    leakArray.push('leak' + Math.random());
};

http.createServer(function(req, res){
    leak();
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('hello world\n');
}).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');

//===================================================

var memwatch = require('memwatch');
var leakArray = [];
var leak = function(){
    leakArray.push("leak" + Math.random());
};

var hd = new memwatch.HeapDiff();

for(var i = 0; i < 10000; i++){
    leak();
}

var diff = hd.end();
console.log(JSON.stringify(diff, null, 2));
//=====================

var reader = fs.createReadStream('in.txt');
var writer = fs.createWriteSteam('out.txt');
reader.on('data', function(chunk){
    writer.writer(chunk);
});

reader.on('end', function(){
    writer.end();
});

var reader = fs.createReadStream('in.txt');
var writer = fs.createwriteStream('out.txt');
reader.pipe(writer);

//===================================
var chunks = [];
var size = 0;
res.on('data', function(chunk){
    chunks.push(chunk);
    size += chunk.length;
});
res.on('end', function(){
    var buf = Buffer.concat(chunks, size);
    var str = iconv.decode(buf, 'utf8');
    console.log(str);
});

//===================================
Buffer.concat = function(list, length){
    if(!Array.isArray(list)){
        throw new Error('Usage: Buffer.concat(list,[length])');
    }
    
    if(list.length === 0){
        return new Buffer(0);
    }else if(list.length === 1){
        return list[0];
    }

    if(typeof length !== 'number'){
        length = 0;
        for(var i = 0; i < list.length; i++){
            var buf = list[i];
            length += buf.length;
        }
    }

    var buffer = new Buffer(length);
    var pos = 0;
    for(var i = 0; i < list.length; i++){
        var buf = list[i];
        buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
}; */

var http = require('http');
var helloworld = "";
for(var i = 0; i < 1024 * 10; i++){
    helloworld += "a";
}

helloworld = new Buffer(helloworld);

http.createServer(function(req, res){
    res.writeHead(200);
    res.end(helloworld);
}).listen(8001);



function runTest(){
    assert(fs.statSync(filename).size === filesize);
    var rs = fs.createReadStream(filename, {
        highWaterMark: size,
        encoding: encoding
    });

    rs.on('open', function(){
        bench.start();
    });

    var bytes = 0;
    rs.on('data', function(chunk){
        bytes += chunk.length;
    });

    rs.on('end', function(){
        try {fs.unlinkSync(filename);} catch (e){}
        bench.end(bytes/(1024 * 1024);
    });
}




