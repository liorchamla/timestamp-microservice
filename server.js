//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');
var express = require('express');
var strftime = require('strftime');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'client')));

router.get('/:date', function(req, res){
  var date = new Date();
  if(/^\d*$/.test(req.params.date)){
    date.setTime(req.params.date);
  } else {
    date = new Date(req.params.date);
  }
  
  
  res.set({ 'Content-Type': 'application/json' }) 
  if(!date.getTime()) res.send(JSON.stringify({error: "Invalid date given"}))
  else res.send(JSON.stringify({
    unix: date.getTime(),
    natural: strftime('%B %d, %Y', date)
  }))
})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Timestamp microservice listening at", addr.address + ":" + addr.port);
});
