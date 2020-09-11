import { EventEmitter } from "events"
import { fstat } from "fs";

/* $.get('/api', {
    success: onSuccess,
    error: onError,
    complete: onComplete
});
$.get('/api')
    .success(onSuccess)
    .error(onError)
    .complete(onComplete); */

var Promise = function(){
    EventEmitter.call(this);
};
util.inherits(Promise, EventEmitter);

Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler){
    if(typeof fulfilledHandler === 'function'){
        this.once('success', fulfilledHandler);
    }
    if(typeof errorHandler === 'function'){
        this.once('error', errorHandler);
    }
    if(typeof progressHandler === 'function'){
        this.on('progress', progressHandler)
    }
    return this;
};

var Deferred = function(){
    this.state = 'unfulfilled';
    this.promise = new Promise();
};

Deferred.prototype.resolve = function(obj){
    this.state = 'fulfilled';
    this.promise.emit('success', obj);
};
Deferred.prototype.reject = function(err){
    this.state = 'failed';
    this.promise.emit('error', err);
};
Deferred.prototype.progress = function(data){
    this.promise.emit('progress', data);
};

res.setEncoding('utf8');
res.on('data', function(chunk){
    console.log('BODY: ' + chunk);
});
res.on('end', function(){
    //done
});
res.on('error', function(err){
    //error
});
res.then(function(){
    //done
},function(err){
    //error
},function(chunk){
    console.log('BODY:' + chunk);
});



var promisify = function(res){
    var deferred = new Deferred();
    var result = '';
    res.on('data', function(chunk){
        result += chunk;
        deferred.progress(chunk);
    });
    res.on('end', function(){
        deferred.resolve(result);
    });
    res.on('error', function(err){
        deferred.reject(err);
    });
    return deferred.promise;
};
promisify(res).then(function(){
    //done
}, function(err){
    //error
}, function(chunk){
    //progress
    console.log('BODY: ' += chunk);
});

defer.prototype.makeNodeResolver = function(){
    var self = this;
    return function(error, value){
        if(error){
            self.reject(error);
        }else if(arguments.length > 2){
            self.resolve(array_slice(arguments, 1));
        }else{
            self.resolve(value);
        }
    };
};

var readFile = function(file, encoding){
    var deferred = Q.defer();
    fs.readFile(file, encoding, deferred.makeNodeResolver());
    return deferred.promise;
};
readFile("foo.txt", "utf-8").then(function(data){
    //success case
},function(err){
    //failed case
});

var failing = require('memeda').failing;
fs.readFile(file, encoding, failing(function(err){
    //todo
}).passing(function(data){
    //todo
}));

Deferred.prototype.all = function(promise){
    var count = promises.length;
    var that = this;
    var result = [];
    promises.forEach(function(promise, i){
        promise.then(function(data){
            count--;
            result[i] = data;
            if(count === 0){
                that.resolve(result);
            }
        }, function(err){
            that.reject(err);
        });
    });
    return this.promise;
};

var promise1 = readFile("foo.txt", "utf-8");
var promise2 = readFile("bar.txt", "utf-8");
var deferred = new Deferred();
deferred.all([promise1, promise2]).then(function(results){
    //todo
}, function(err){
    //todo
});

obj.api1(function(value1){
    obj.api2(value1, function(value2){
        obj.api3(value2, function(value3){
            obj.api4(value3, function(value4){
                callback(value4);
            });
        });
    });
});

var handler1 = function(value1){
    obj.api2(value1, handler2);
};
var handler2 = function(value2){
    obj.api3(value2, handler3);
};
var handler3 = function(value3){
    obj.api4(value3, hander4);
};
var handler4 = function(value4){
    callback(vleu4);
}
obj.api1(handler1);

var emitter = new event.Emitter();

emitter.on("step1", function(){
    obj.api1(function(value1){
        emitter.emit("step2", value1);
    });
});

emitter.on("step2", function(vlue1){
    obj.api2(value1, function(value2){
        emitter.emit("step3", vlue2);
    });
});

emitter.on("step3", function(value2){
    obj.api3(value2, function(value3){
        emitter.emit("step4", value3);
    });
});
emitter.on("step4", function(value3){
    obj.api4(value3, function(value4){
        callback(value4);
    });
});
emitter.emit("step1");

promise()
    .then(obj.api1)
    .then(obj.api2)
    .then(obj.api3)
    .then(obj.api4)
    .then(function(value4){
        //do
    },function(error){
        //error
    })
    .done();

var Deferred = function(obj){
    this.promise = new Promise();
};

//完成态
Deferred.prototype.resolve = function(obj){
    var promise = this.promise;
    var handler;
    while(handler = promise.queue.shift()){
        var ret = handler.fulfilled(obj);
        if(ret && ret.isPromise){
            ret.queue = promise.queue;
            this.promise = ret;
            return;
        }
    }
};

//失败态
Deferred.prototype.reject = function(err){
    var promise = this.promise;
    var handler;
    while(handler = promise.queue.shif()){
        if(handler && handler.error){
            var ret = handler.error(err);
            if(ret && ret.isPromise){
                ret.queue = promise.queue;
                this.promise = ret;
                return;
            }
        }
    }
};

//生成回调函数
Deferred.prototype.callback = function(){
    var that = this;
    return function(err, file){
        if(err){
            return that.reject(err);
        }
        that.resolve(file);
    };
};

var Promise = function(){
    //队列用于存储待执行的回调函数
    this.queue = [];
    this.isPromise = true;
};

Promise.prototype.then = function(fulfilledHandler, errorHandler, prgressHandler){
    var handler = {};
    if(typeof fulfilledHandler === 'function'){
        handler.fulfilled = fulfilledHandler;
    }
    if(typeof errorHandler === 'function'){
        handler.error = errorHandler;
    }
    this.queue.push(handler);
    return this;
};

var readFile1 = function(file, encoding){
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.callback());
    return deferred.promise;
};
var readFile2 = function(file, encoding){
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.callback());
    return deferred.promise;
};

readFile1('file1.txt', 'utf8').then(function(file1){
    return readFile2(file1.trim(), ' utf8');
}).then(function(file2){
    console.log(file2);
});

var smooth = function(method){
    return function(){
        var deferred = new Deferred();
        var args = Array.prototype.slice.call(arguments, 0);
        args.push(deferred.callback());
        method.apply(null, args);
        return deferred.promise;
    };
};

var readFile = smooth(fs.readFile);

var readFile = smooth(fs.readFile);
readFile('file1.txt', 'utf8').then(function(file1){
    return readFile(file1.trim(), 'utf8');
}).then(function(file2){
    console.log(file2);
});








