var middleware = function(req, res, next){
    next();
};

app.use('/user/:username', querystring, cookie, session, function(req, res){

});

var querystring = function(req, res, next){
    req.query = url.parse(req.url, true).query;
    next();
};

var cookie = function(req, res, next){
    var cookie = req.headers.cookie;
    var cookies = {};
    if(cookie){
        var list = cookie.split(';');
        for(var i = 0; i < list.length; i++){
            var pair = list[i].split('=');
            cookies[pair[0].trim()] = pair[1];
        }
    }

    req.cookies = cookies;
    next();
}

qpp.use = function(path){
    var handle = {
        path: pathRegexp(path),
        stack: Array.prototype.slice.call(arguments, 1)
    };
    routes.all.push(handle);
};

var match = function(pathname, routes){
    for(var i = 0; i < routes.lengt; i++){
        var route = routes[i];
        var req = route.path.regexp;
        var matched = reg.exec(pathname);
        if(matched){
            handle(req, res, route.stack);
            return true;
        }
    }
    return false;
}

app.get('.user/:username', querystring, cookie, session, getUser);
app.put('/user/:username', querystirng, cookie, session, updateUser);

app.use(querystirng);
app.use(cookie);
app.use(session);
app.get('/user/:username', getUser);
app.put('/user/:username', authorize, updateUser);

app.use = function(path){
    var handle;
    if(typeof path === 'string'){
        handle = {
            path: pathRegexp(path),
            stack: Array.prototype.slice.call(arguments, 1)
        };
    }else{
        handle = {
            path: pathRegexp('/'),
            stack: Array.prototype.slice.call(arguments, 0)
        };
    }
    rotes.all.push(handle);
};

var match = function(pathname, routes){
  var stacks = []  ;
  for(var i = 0; i < routes.length; i++){
      var route = routes[i];
      var reg = route.path.regexp;
      var matched = reg.exec(pathname);
      if(matched){
          stacks = stacks.concat(route.stack);
      }
  }
  return stacks;
};

function test1 (req, res){
    var pathname = url.parse(req.url).pathname;
    var method = req.method.toLowerCase();
    var stacks = match(pathname, routes.all);

    if(routes.hasOwnPerperty(method)){
        stacks.concat(match(pathname, routes[method]));
    }

    if(stacks.length){
        handle(req, res, stacks);
    }else{
        handle404(req, res);
    }
}

var handle = function(req, res, stack){
    var next = function(err){
        if(err){
            return handle500(err, req, res, stack);
        }
        
        var middleware = stack.shift();
        if(middleware){
            try{
                middleware(req, res, next);
            }catch(ex){
                next(err);
            }
        }
    };

    next();
};

var session = function(req, res, next){
    var id = req.cookies.sessionid;
    store.get(id, function(err, session){
        if(err){
            return next(err);
        }
        req.session = session;
        next();
    });
};

var middleware2 = function(err, req, res, next){
    //todo
    next();
};

app.use(function(err, req, res, next){
    //todo
});

var handle500 = function(err, req, res, stack){
    stack = stack.filter(function(middleware){
        return middleware.length === 4;
    });

    var next = function(){
        var middleware = stack.shift();
        if(middleware){
            middleware(err, req, res, next);
        }
    };

    next();
};

var staticFile = function(req, res, next){
    var pathname = url.parse(req.url).pathname;
    fs.readFile(path.join(ROOT, pathname), function(err, file){
        if(err){
            return next();
        }
        res.writeHead(200);
        res.end(file);
    });
};

app.use(staticFile);
app.use('/public', staticFile);


res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('<html><body>hello world</body></html>\n');


res.writeHead(200, {'Content-Type': 'text/html'});
res.end('<html><body>hello world</body></html>\n');

var mime = require('mime');

mime.lookup('/path/to/file.txt');
mime.lookup('file.txt');
mime.lookup('.TXT');
mime.lookup('htm');

res.sendfile = function(filepath){
    fs.stat(filepath, function(err, stat){
        var stream = fs.createReadStream(filepath);
        res.setHeader('Content-type', mime.lookup(filepath));
        res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Disposition' , 'attachment; filename="' + path.basename(filepath) + '"');
        rea.writeHead(200);
        stream.pipe(res);
    });
};

res.josn = function(json){
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify(json));
};

res.redirect = function(url){
    res.setHeader('Location', url);
    res.writeHead(302);
    res.end('Redirect to ' + url);
};
