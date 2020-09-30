var sessions = {};
var key = 'session_id';
var EXPIRES = 20 * 60 * 1000;

var generate = function(){
    var session = {};
    session.id = (new Date()).getTime() + Match.random();
    session.cookie = {
        exprie: (new Date()).getTime() + EXPIRES
    };
    sessions[session.id] = session;
    return session;
}

function check(req,res){
    var redirect = function(url){
        res.setHeader('Location', url);
        res.writeHead(302);
        res.end();
    };
    
    var id = req.cookie[key];
    if(!id){
        req.session = generate();
    }else{
        var session = session[id];
        if(session){
            if(session.cookie.expire > (new Date()).getTime()){
                //更新超时时间
                session.cookie.expire = (new Date()).getTime() + EXPIRES;
                req.session = session;
            }else{
                //超时了，删除旧的数据，并重新生成
                delete sessions[id];
                req.session = generate();
            }
        }else{
            //如果session过期或口令不对，重新生成session
            req.session = generate();
        }
    }
    handle(req, res);
}

var writeHead = res.writeHead;
res.writeHead = function(){
    var cookies = res.getHeader('Set-Cookie');
    var session = serialize(key, req.seeion.id);
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies, session];
    res.setHeader('Set-Cookie', cookies);
    return writeHead.apply(this, arguments);
}

var handle = function(req, res){
    if(!req.session.isVisit){
        req.session.isVisit = true;
        res.writeHead(200);
        res.end('欢迎第一次来到动物园');
    }else{
        res.writeHead(200);
        res.end('动物园再次欢迎你') 
    }
};

var getURL = function(_url, key, value){
    var obj = url.parse(_url, true);
    obj.query[key] = value;
    return url.format(obj);
};

//session与安全
var sign = function(val, secrect){
    return val + '.' + crypto
        .createHmac('sha256', secrect)
        .update(val)
        .digest('base64')
        .replace(/\=+$/, '');
};

var val = sign(req.sessionID, secret);
res.setHeader('Set-Cookie', cookie.serialize(key, val));

var unsign = function(val, secrect){
    var str = val.slice(0, val.lastIndexOf('.'));
    return sign(str, secret) == val ? str : false;
};




