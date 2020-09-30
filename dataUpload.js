var hasBody = function(req){
    return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
};

function test1(req, res){
    if(hasBody(req)){
        var buffers = [];
        req.on('data', function(chunk){
            buffers.push(chunk);
        });
        req.on('end', function(){
            req.rawBody = Buffer.concat(buffers).toString();
            handle(req, res);
        });
    }else{
        handle(req, res);
    }
}

var handle = function(req, res){
    if(req.headers['content-type'] === 'application/x-www-form-urlencoded'){
        req.body = querystring.parse(req.rawBody);
    }
    todo(req, res);
};

var mime = function(req){
    var str = req.headers['content-type'] || '';
    return str.split(';')[0];
};

var handle2 = function(req, res){
    if(mime(req) === 'application/json'){
        try{
            req.body = JSON.parse(req.rawBody);
        }catch(e){
            //异常内容，响应bad request
            res.writeHead(400);
            res.end('Invalid JSON');
            return;
        }
    }
    todo(req, res);
};

var xml2js = require('xml2js');

var handle3 = function(req, res){
    if(mime(req) === 'application/xml'){
        xml2js.parseString(req.rawBody, function(err, xml)){
            if(err){
                //异常内容，响应bad request
                res.writeHead(400);
                res.end('Invalid XML');
                return;
            }
            req.body = xml;
            todo(req, res);
        };
    }
};

function test2(req, res){
    if(hasBody(req)){
        var done = function(){
            handle(req, res);
        };
        if(mime(req) === 'application/json'){
            parseJSON(req, done);
        }else if(mime(req) === 'application/xml'){
            parseXML(req, done);
        }else if(mime(req) === 'multipart/form-data'){
            parseMultipart(req, done);
        }
    }else{
        handle(req, res);
    }
}

var formidable = require('formidable');
function test3(req, res){
    if(hasBody(req)){
        if(mime(req) === 'multipart/form-data'){
            var form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files){
                req.body = fields;
                req.files = files;
                handle(req, res);
            });
        }
    }else{
        handle(req, res);
    }
}

var bytes = 1024;
function test4(req, res){
    var received = 0;
    var len = req.headers['content-length'] ? parseInt(req.headers['content-length'], 10) : null;

    if(len && len > bytes){
        res.writeHead(413);
        res.end();
        return;
    }

    req.on('data', function(chunk){
        received += chunk.length;
        if(received > bytes){
            req.destroy();
        }
    });

    handle(req, res);
};

//CSRF
function test5(req, res){
    var content = req.body.content || '';
    var username = req.session.username;
    var feedback = {
        username: username,
        content: content,
        updateAt: Date.now()
    };
    db.save(feedback, function(err){
        res.writeHead(200);
        res.end('Ok');
    });
}

var generateRandom = function(len){
    return crypto.randomBytes(Mtch.ceil(len * 3 / 4))
        .toString('base64')
        .slice(0, len);
};

var token = req.session._csrf || (req.session._csrf = generateRandom(24));

function test6(req, res){
    var token = req.session._csrf || (req.session._csrf = generateRandom(24));
    var _csrf = req.body._csrf;
    if(token !== _csrf){
        res.writeHead(403);
        res.end('禁止访问');
    }else{
        handle(req, res);
    }
}





