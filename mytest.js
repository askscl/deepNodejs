function foo(x){
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

