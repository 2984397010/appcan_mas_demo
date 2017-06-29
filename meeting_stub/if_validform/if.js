var MEAP=require("meap");
var MAIN = require('../main.js');

function run(Param, Robot, Request, Response, IF)
{
    if (Param.baas && Param.baas.action) {
        //有action的话
        var funs={
            'custNameVaild':custNameVaild
        }
        funs[Param.baas.action](Param, Robot, Request, Response, IF);
    } else {
        //没有的话
        index(Param, Robot, Request, Response, IF);
    }

}
/**
 * 客户名称唯一性验证
 * @param {Object} Param
 * @param {Object} Robot
 * @param {Object} Request
 * @param {Object} Response
 * @param {Object} IF
 */
function custNameVaild(Param, Robot, Request, Response, IF) {
    //param={name:"accountName",param:"1012232122"}
    var param = MAIN.getParams(Param);
    var rdata={};
    if(param.param=='101'){
        rdata = {
            info:'验证通过',
            status:'y'
        }
    }else{
         rdata = {
            info:'用户名不存在',
            status:'n'
        }
    }
    setTimeout(function(){
         MAIN.responseEnd(Response, rdata);
    },2600);
   
}   
exports.Runner = run;


                                

    

