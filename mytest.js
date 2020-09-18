/* function foo(x){
    return x;
}

function foo(x){
    return function(){
        return x;
    };
}

function foo(x, bar){
    return bar(x);
}

var points = [40,10,1,5,25,10];
points.sort(function(a, b){
    return a - b;
});

var emitter = new events.EventEmitter();
emitter.on('event_foo', function(){
    //todo
});

var toString = Object.prototype.toString;

var isStirng = function(obj){
    return toString.call(obj) == '[object Stirng]';
};
var isFunction = function(obj){
    return toString.call(obj) == '[object Function]';
};

var isType = function(type){
    return function(obj){
        return toString.call(obj) == '[object' + type +']';
    };
};

var isString = isType('String');
var isFunction = isType('Function');

setTimeout(() => {
    console.log(1, new Date());
    setTimeout(() => {
        console.log(2, new Date());
        setTimeout(() => {
            console.log(3, new Date());
        }, 2000);
    },1000);
},1000);

function ajax(url, cb){
    //
}
//..
ajax("htpp://some.url.1", function handler(err, contents){
    if(err){
        //处理ajax错误
    }else{
        //处理contents成功情况
    }
});

function ajax(url){
    return new Promise(function pr(resolve, reject){
        //建立请求，最终会调用resolve(..)或者reject(..)
    });
}
ajax("http://some.url.1")
.then(function fulfilled(contents){
    //处理contents成功情况
}, function reject(reason){
    //处理ajax出错原因
}); */

/* setTimeout(() => {console.log(4);}, 0);
new Promise((resolve) => {
    console.log(1);
    resolve();
    console.log(2);
}).then(() => {
    console.log(5);
    new Promise((resolve) => {
        console.log(6);
        resolve();
        console.log(7);
    }).then(() => {
        console.log(8);
        setTimeout(() => {console.log(9);},0)
    });
});
console.log(3); */

/* step1()
.then(
    step2,
    step2Failed
)
.then(
    function(msg){
        return Promise.all([
            step3a(msg),
            step3b(msg),
            step3c(msg)
        ])
    }
)
.then(step4); */

function p(time){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date());
        }, time)
    });
}

p(1000).then((data) => {
    console.log(1, data);
    return p(1000);
}).then((data) => {
    console.log(2, data);
    return p(2000);
}).then((data) => {
    console.log(3, data);
});


co(function* delay(){
    let time1 = yield p(1000);
    console.log(1, time1);
    let time2 = yield p(1000);
    console.log(2, time2);
    let time3 = yield p(2000);
    console.log(3, time3);
})

function co(gen){
    let it = gen();
    next();
    function next(arg){
        let ret = it.next(arg);
        if(ret.done) return;
        ret.value.then((data) => {
            next(data)
        })
    }
}

(async function(){
    let time1 = await p(1000);
    console.log(11, time1);

    let time2 = await p(1000);
    console.log(22, time2);

    let time3 = await p(2000);
    console.log(33, time3);
})()

function* foo(x){
    let y = x * (yield);
    return y;
}

let it = foo(6);
let res = it.next();
res = it.next(7);