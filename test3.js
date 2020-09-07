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


