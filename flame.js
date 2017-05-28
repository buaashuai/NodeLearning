var express = require('express');
var app = express();
var url = require('url');
var bodyParser = require('body-parser');
var fs = require("fs");
var multer  = require('multer');
var cookieParser = require('cookie-parser')

app.use(express.static('public'));
app.use(cookieParser());
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var upload = multer({dest: './tmp'});

//设置跨域访问  
app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    res.header("X-Powered-By",' 3.2.1')  
    res.header("Content-Type", "application/json;charset=utf-8");  
    next();  
});

app.get('/', function (req, res) {
   res.send('Hello World');
   console.log( __filename );
   var path = require("path");
});
app.post('/api/student_location', function (req, res) {
   var obj = JSON.parse(fs.readFileSync('./db/flame_location.json'));
   res.send(obj);
   // Parse the request containing file name
   var pathname = url.parse(req.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
});
app.post('/api/news', function (req, res) {
   var obj = JSON.parse(fs.readFileSync('./db/flame_news.json'));
   res.send(obj);
   // Parse the request containing file name
   var pathname = url.parse(req.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
});
app.post('/api/banner', function (req, res) {
   var obj = JSON.parse(fs.readFileSync('./db/flame_banner.json'));
   res.send(obj);
   // Parse the request containing file name
   var pathname = url.parse(req.url).pathname;
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
});
app.get('/api/user.do_doLogin', function (req, res) {
   console.log("Got a GET request for /list_user");
   var obj = {
    success: true,
    msg: '消息',
    code: '400',
	data: {
		userName: '张三',
		userId: '12224',
		realName: '张老板',
		departName: '软件开发2',
		departId: '12',
		rankName: '工程师',
		rankId: '22',
		token: '111111111111111111',
	}
   };
   res.send(obj);
   // Parse the request containing file name
   var pathname = url.parse(req.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
});
app.get('/api/user.do_getUserinfo', function (req, res) {
   console.log("Got a GET request for /list_user");
   var obj = {
    success: true,
    msg: '消息',
    code: '400',
	data: {
		userName: '张三',
		userId: '12224',
		realName: '张老板',
		departName: '软件开发',
		departId: '12',
		rankName: '工程师',
		rankId: '22',
		token: '111111111111111111',
	}
   };
   res.send(obj);
   // Parse the request containing file name
   var pathname = url.parse(req.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
});
app.get('/api/audit.do_getAuditList', function (req, res) {
   console.log("Got a GET request for /api/audit.do?getAuditList");
   var obj = {};
	var type = req.query.isAudit;
	if(type === '1'){
	   obj = JSON.parse(fs.readFileSync('./db/yswb_audited.json'));
   }else if(type === '0'){
	   obj = JSON.parse(fs.readFileSync('./db/yswb_auditing.json'));
   }
   
   res.send(obj);
   // Parse the request containing file name
   var pathname = url.parse(req.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
});

app.get('/api/bill.do_getBill', function (req, res) {
   console.log("Got a GET request for api/bill.do?getBill");
   // 费用报销
   var obj = JSON.parse(fs.readFileSync('./db/yswb_fee.json'));
   // 出差/出国申请单
   var obj2 = JSON.parse(fs.readFileSync('./db/yswb_abroad.json'));
   // 请款单
   var obj3 = JSON.parse(fs.readFileSync('./db/yswb_qingkuan.json'));
   // 公务接待报销单
   var obj4 = JSON.parse(fs.readFileSync('./db/yswb_official.json'));
   // 劳资费单
   var obj5=JSON.parse(fs.readFileSync('./db/yswb_labour.json'));
   var type = req.query.type;
   console.log(type);
   if(type === '1'){
	   res.send(obj);
   }else if(type === '2'){
	   res.send(obj2);
   }else if(type === '3'){
	   res.send(obj3);
   }else if(type === '4'){
	   res.send(obj4);
   }else if(type === '5'){
	   res.send(obj5);
   }else{
	   res.send({});
   }
   
   // Parse the request containing file name
   var pathname = url.parse(req.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
});

app.get('/api/budget.do_getResultList', function (req, res) {
   console.log("Got a GET request for /api/budget.do?getResultList");
   var obj = JSON.parse(fs.readFileSync('./db/yswb_budget.json'));
   res.send(obj);
   // Parse the request containing file name
   var pathname = url.parse(req.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
});
app.get('/api/budget.do_getDepartList', function (req, res) {
   console.log("Got a GET request for /api/budget.do?getDepartList");
   var obj = JSON.parse(fs.readFileSync('./db/yswb_departs.json'));
   res.send(obj);
   // Parse the request containing file name
   var pathname = url.parse(req.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
});
app.get('/process_get', function (req, res) {

   // Prepare output in JSON format
   response = {
       first_name:req.query.first_name,
       last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});
app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});
app.post('/file_upload', upload.single('myImage'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
     console.log(req.file);
    response = {
       result:'文件上传成功!'
   };
   res.send(JSON.stringify(response));
});

var server = app.listen(8088, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Api server listening at http://%s:%s", host, port);

});