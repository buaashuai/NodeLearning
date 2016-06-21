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


app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
   console.log("Cookies: ", req.cookies)
})

app.get('/', function (req, res) {
   res.send('Hello World');
   console.log( __filename );
   var path = require("path");

// Normalization
console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));

// Join
console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));

// Resolve
console.log('resolve : ' + path.resolve('main.js'));

// extName
console.log('ext name : ' + path.extname('main.js'));
});

app.get('/domain', function (req, res) {
    var EventEmitter = require("events").EventEmitter;
    var domain = require("domain");

    var emitter1 = new EventEmitter();

    // Create a domain
    var domain1 = domain.create();

    domain1.on('error', function(err){
       console.log("domain1 handled this error ("+err.message+")");
    });

    // Explicit binding 
    domain1.add(emitter1);

    emitter1.on('error',function(err){
       console.log("listener handled this error ("+err.message+")");
    });

    emitter1.emit('error',new Error('To be handled by listener'));

    emitter1.removeAllListeners('error');

    emitter1.emit('error',new Error('To be handled by domain1'));

    var domain2 = domain.create();

    domain2.on('error', function(err){
       console.log("domain2 handled this error ("+err.message+")");
    });

    // Implicit binding
    domain2.run(function(){
       var emitter2 = new EventEmitter();
       emitter2.emit('error',new Error('To be handled by domain2'));   
    });


    domain1.remove(emitter1);
    emitter1.emit('error', new Error('Converted to exception. System will crash!'));
});
app.post('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
});
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   var obj = {
    id: 1,
    name: '汪帅',
    gender: '男',
    school: 'BUAA'
   };
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

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Api server listening at http://%s:%s", host, port);

});