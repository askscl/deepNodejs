var http = require('http');
var options = {
    host: 'www.google.com',
    port: 80,
    path: '/upload',
    method: 'POST'
};
var req = http.request(options, function(res){
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        console.log('BODY: ' + chunk);
    });
    res.on('end', function(){
        //todo
    });
});
req.on('error', function(e){
    console.log('problem with request: ' + e.message );
});
req.write('data\n');
req.write('data\n');
req.end();

var events = require('events');
function Stream(){
    events.EventEmitter.call(this);
}
// util.inherits(Stream, events.EventEmitter);

var select = function(callback){
    db.select('SQL', function(results){
        callback(results);
    });
};

var proxy = new events.EventEmitter();
var status = "ready";
var select = function(callback){
    proxy.once("selected", callback);
    if(status === "ready"){
        status = "pending";
        db.select("SQL", function(results){
            proxy.emit("selected", results);
            status = "ready";
        });
    }
};

// 多异步之间的协作方案
var fs = require('fs');
var count = 0;
var results = {};
var done = function(key, value){
    results[key] = value;
    count++;
    if(count === 3){
        //渲染页面
        render(results);
    }
};
/* fs.readFile(template_path, "utf8", function(err, template){
    done("template", template);
});
db.query(sql, function(err, data){
    done("data", data);
});
l10n.get(function(err, resources){
    done("resources", resources);
}); */

/* var after = function(times, callback){
    var count = 0, results = {};
    return function(key, value){
        results[key] = value;
        count++;
        if(count === times){
            callback(results);
        }
    };
};

var done = after(times, render); */

//利用发布/订阅方式来完成多对多的方案
var emitter = new events.Emitter();
var done = after(times, render);

emitter.on("done", done);
emitter.on("done", other);

fs.readFile(template_path, "utf8", function(err, template){
    emitter.emit("done", "template", template);
});

db.query(sql, function(err, data){
    emitter.emit("done", "data", data);
});
l10n.get(function(err, resources){
    emitter.emit("done", "resources", resources);
});

//笔者自己写的EventProxy模块
var proxy = new EventProxy();
proxy.all("template", "data", "resources", function(template, data, resources){

});

fs.readFile(template_path, "utf8", function(err, template){
    proxy.emit("template", template);
});
db.query(sql, function(err, data){
    proxy.emit("data", data);
});
l10n.get(function(err, resources){
    proxy.emit("resources", resources);
});

proxy.after("data", 10, function(datas){
    //todo
});




