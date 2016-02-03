/*
 * @param {Object} target 目标对象。
 * @param {Object} source 源对象。
 * @param {boolean} deep 是否复制(继承)对象中的对象。
 * @returns {Object} 返回继承了source对象属性的新对象。
 */
function extend(target, /*optional*/source, /*optional*/deep) {
    target = target || {};
    var sType = typeof source,
        i = 1,
        options;
    if (sType === 'undefined' || sType === 'boolean') {
        deep = sType === 'boolean' ? source : false;
        source = target;
        target = this;
    }
    if ( typeof source !== 'object' && Object.prototype.toString.call(source) !== '[object Function]')
        source = {};
    while (i <= 2) {
        options = i === 1 ? target : source;
        if (options != null) {
            for (var name in options ) {
                var src = target[name],
                    copy = options[name];
                if (target === copy)
                    continue;
                if (deep && copy && typeof copy === 'object' && !copy.nodeType)
                    target[name] = this.extend(src || (copy.length != null ? [] : {}), copy, deep);
                else if (copy !== undefined)
                    target[name] = copy;
            }
        }
        i++;
    }
    return target;

};


/**
 * 输出到页面
 * @param {Object} Response Response对象
 * @param {Object} result 返回前端结果
 */
exports.responseEnd =function (Response, result){
    var html;
    if ( typeof (result) == "object") {
        Response.setHeader("Content-Type", "application/json; charset=utf-8");
        html = JSON.stringify(result);
    } else if( result&&result.length>0) {
        //输出html代码
        Response.setHeader("Content-Type", "text/html; charset=utf-8");
        html = result;
    } else {
        //防止一些接口异常直接返回空，导致前端ajax出现判断异常，没有在model.ajax里面捕获
        Response.setHeader("Content-Type", "application/json; charset=utf-8");
        //返回解析异常
        html = JSON.stringify({status : -2,message : '格式异常'});
    }
    Response.end(html);
};
/**
 *统一输出桩接口数据 
 */
exports.responseStub = function(Response,fileName){
     var path = require("path");
    var fs = require("fs");
    var dir = path.join(__dirname, fileName);
    Response.setHeader("Content-Type","text/html; charset=utf-8");
    fs.readFile(dir, function(err, data){
        if (err)
            throw err;
        setTimeout(function(){
            //模拟真实情况的接口响应时间
            Response.end(data);
        },2500)
        
    });
}

/**
 * 获取request的get和post请求
 * @param Request
 * @returns {{}}
 */
exports.getParams=function(Param){
    var params=extend(Param.fields,Param.params,false);
    return params;
}