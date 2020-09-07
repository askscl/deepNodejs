function foo(x){
    return x;
}
function foo(x){
    return function () {
        return x;
    };
}

function foo(x, bar){
    return bar(x);
}

var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){
    return a - b;
});
console.log(points);

/* var emitter = new EventSource.EventEmitter();
emitter.on('event_foo', function(){
    //todo
});
 */

 var toString = Object.prototype.toString;
 var isString = function(obj){
     return toString.call(obj) == '[object String]';
 };
 var isFunction = function (obj){
     return toString.call(obj) == '[object Function]';
 };

 var isType = function(type){
     return function(obj){
         return toString.call(obj) == '[object ' + type + ']';
     };
 };

 var isString = isType('String');
 var isFunction = isType('Function');

/*  _.after = function(times, func){
     if(times <= 0) return func();
     return function(){
         if(--times < 1) { return func.apply(this, arguments);}
     };
 }; */

 try{
     JSON.parse(json);
 }catch(e){
     //todo
 }

 var async = function(callback){
     process.nextTick(callback);
 };

 try{
     async(callback);
 }catch(e){
     //todo
 }

 async(function(err, result){
     //todo
 });

 var async = function(callback){
     process.nextTick(function(){
         var result = something;
         if(error){
             return callback(error);
         }
         callback(null, results);
     });
 };

/*  try{
     req.body = JSON.parse(buf, option.reviver);
     callback();
 }catch(err){
     err.body = buf;
     err.status = 400;
     callback(err);
 } */

/*  $(selector).click(function(event){
     //todo
 });

 $(selector).change(function(event){
     //todo
 }); */


/*  fs.readdir(path.join(__dirname, '..'),function(err, files){
     files.forEach(function(filename, index){
         fs.readFile(filename, 'utf8', function(err, file){
             //todo
         });
     });
 }); */

/*  fs.readFile(template_path, 'utf8', function(err, template){
     db.query(sql, function(err, data){
         l10n.get(function(err, resources){
             //todo
         });
     });
 }); */
/* 
 var start = new Date();
 while(new Date() - start <1000){} */

 emitter.on('event1', function(message){
     console.log(message);
 });
 emitter.emit('event1', 'I am message!');
 



















 
