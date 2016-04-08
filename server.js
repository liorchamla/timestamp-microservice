/**
 * FreeCodeCamp Request header parser microservice
 * Just returns a JSON with IP, language and OS from the browser
 * @author Lior Chamla
 */
var http = require('http');
var path = require('path');
var express = require('express');
var router = express();
var server = http.createServer(router);

// route on GET with a parameter we call :date
router.get('/', function(req, res){
  // giving headers for JSON
  res.set({ 'Content-Type': 'application/json' }) 
  res.send(JSON.stringify({
    ipaddress: req.headers['x-forwarded-for'],
    language: req.headers['accept-language'].substring(0,5),
    // this is the only one which is tricky : we have to extract the only information we need, for this I use a regular expression
    software: req.headers['user-agent'].match(/\(([^(]*)\)/gi)[0].replace(/\(|\)/gi, '')
  }))
})

// listening to port and processing
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Request header parser microservice listening at", addr.address + ":" + addr.port);
});
