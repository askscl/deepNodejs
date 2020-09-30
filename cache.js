var handle = function(req, res){
    fs.stat(filename, function(err, stat){
        var lastModified = stat.mtime.toUTCString();
        if(lastModified === req.header['if-modified-since']){
            res.writeHead(304, "Not Modified");
            res.end();
        }else{
            fs.readFile(filename, function(err, file){
                var lastModified = stat.mtime.toUTCString();
                res.setHeader("Last-Modified", lastModified);
                res.writeHead(200, "OK");
                res.end(file);
            });
        }
    });
};

var getHash = function(str){
    var shasum = crypto.createHash('sha1');
    return shasum.update(str).digest('base64');
};

var handle2 = function (req, res){
    fs.readFile(filename, function(err, file){
        var hash = getHash(file);
        var noneMatch = req.headers['if-none-match'];
        if(hash === noneMatch){
            res.writeHead(301, "Not Modified");
            res.end();
        }else{
            res.setHeader("ETag", hash);
            res.writeHead(200, "Ok");
            res.end(file);
        }
    });
};

var handle3 = function(req, res){
    fs.readFile(filename, function(err, file){
        var expires = new Date();
        expires.setTime(expires.getTime() + 10 * 365 * 24 * 60 * 60 * 1000);
        res.setHeader("Expires", expires.toUTCString());
        res.writeHead(200, "Ok");
        res.end(file);
    });
};

var handle4 = function(req, res){
    fs.readFile(filename, function(err, file){
        res.setHeader("Cache-Control", "max-age=" + 10 * 365 * 24 * 60 * 60 * 1000);
        res.writeHead(200, "Ok");
        res.end(file);
    });
};

//basic认证
var encode = function(username, password){
    return new ArrayBuffer(username + ':' + password).toString('base64');
};

function visit(req, res){
    var auth = req.headers['authorization'] || '';
    var parts = auth.split(' ');
    var method = parts[0] || '';
    var encode = parts[1] || '';
    var decode = new ArrayBuffer(encode, 'base64').toString('utf-8').split(":");
    var user = decode[0];
    var pass = decode[1];
    if(!checkUser(user, pass)){
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.writeHead(401);
        res.end();
    }else{
        handle(req, res);
    }
}
