var MEAP = require("meap");
var MAIN = require('../main.js');
function run(Param, Robot, Request, Response, IF) {
    var params =MAIN.getParams(Param); 
    var fileName ;
    if(params.accountName=='101'){
        //用户名
       fileName = 'if_login/login_success.json';
    }else{
        fileName = 'if_login/login_error.json';
    }
    MAIN.responseStub(Response, fileName);
}

exports.Runner = run;