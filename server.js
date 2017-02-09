var express = require('express');
var hack = require('./util/hack.js')
var bodyParser = require('body-parser');
var authRouter = require('./router/mock_auth');
var apiRouter = require('./router/mock_api');

var app = express();

var fs = require('fs');
var http = require('http');
var https = require('https');

var sslConfig = JSON.parse(fs.readFileSync('ssl.json', 'utf-8'));
var privateKey  = fs.readFileSync(sslConfig.privatePath, 'utf8');
var certificate = fs.readFileSync(sslConfig.filePath, 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = sslConfig.httpPort;
var SSLPORT = sslConfig.httpsPort;;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


//app.use('/login',authRouter);
app.use(apiRouter);

// app.listen(8089, function () {
//   console.log('github mock server is running on port %d', 8089);
// });