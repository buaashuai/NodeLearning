var http = require("http");
var fs = require("fs");
var events = require('events');
var eventEmitter = new events.EventEmitter();
var count = 0;
var requestListener = function connected() {
    var numargs = arguments.length;
    var str = '';
    for(var i=0;i<numargs;i++){
        str+=arguments[i]+',';
    }
   console.log('receive a new request.['+str+']'+(count++));
};
eventEmitter.on('new_request', requestListener);
http.createServer(function (request, response) {
    eventEmitter.emit('new_request','parm1','parm2');

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   fs.readFile('input.txt', function (err, data) {
        if (err) 
            response.end('error');
        else
            response.end(data);

    });

   console.log("Going to get file info!");
    fs.stat('input.txt', function (err, stats) {
       if (err) {
           return console.error(err);
       }
       console.log(stats);
       console.log("Got file info successfully!");
       
       // Check file type
       console.log("isFile ? " + stats.isFile());
       console.log("isDirectory ? " + stats.isDirectory());    
    });

}).listen(8080);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/')