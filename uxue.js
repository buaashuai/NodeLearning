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

app.get('/getCourseDownloadingList', function (req, res) {
   console.log("Got a GET request for getCourseDownloadingList");
   var obj = {};
	var type = req.query.isAudit;
	obj = JSON.parse(fs.readFileSync('./db/uxue_正在下载列表.json'));
   
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