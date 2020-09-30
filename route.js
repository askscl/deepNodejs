exports.setting = function(req, res){
    //todo
};

var rotes = [];
var use = function(path, action){
    routes.push([pathRegexp(path), action]);
};

function test1(req, res){
    var pathname = url.parse(req.url).pathname;
    for(var i = 0; i < routes.length; i++){
        var route = routes[i];
        //正则匹配
        if(route[0].exec(pathname)){
            var action = route[1];
            action(req, res);
            return;
        }
    }
    //处理404请求
    handle404(req, res);
}

use('/user/setting', exports.setting);
use('/setting/user', exports.setting);
use('/setting/user/jacksontian', exports.setting);

var pathRegexp = function(path){
    path = path
        .concat(strict ? '' : '/?')
        .replace(/\/\(/g, '(?:/')
        .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function (_, slash, format, key, capture,
            optional, star) {
            slash = slash || '';
            return ''
                + (optional ? '' : slash)
                + '(?:'
                + (optional ? slash : '')
                + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')'
                + (optional || '')
                + (star ? '(/*)?' : '');
        })
        .replace(/([\/.])/g, '\\$1')
        .replace(/\*/g, '(.*)');
    return new RegExp('^' + path + '$');
}

