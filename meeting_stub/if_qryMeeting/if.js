var MEAP=require("meap");
var MAIN = require('../main.js');
function run(Param, Robot, Request, Response, IF)
{
	if (Param.baas && Param.baas.action) {
        //有action的话
        var funs={
            //查询所有
            'all':all
        }
        funs[Param.baas.action](Param, Robot, Request, Response, IF);
    } else {
        //没有的话
        index(Param, Robot, Request, Response, IF);
    }
	
}
/**
 * 默认执行index
 */
function index(Param, Robot, Request, Response, IF){
    Response.end('hello');
}
/**
 * 查询所有的会议
 * @param {Object} Param
 * @param {Object} Robot
 * @param {Object} Request
 * @param {Object} Response
 * @param {Object} IF
 */
function all(Param, Robot, Request, Response, IF){
    var params =MAIN.getParams(Param); 
    var fileName ;
    if(params.pageNum==1){
        //第一页
       fileName = 'if_qryMeeting/page1.json';
    }else{
        fileName = 'if_qryMeeting/page2.json';
    }
    MAIN.responseStub(Response, fileName);
}

exports.Runner = run;


                                

	

