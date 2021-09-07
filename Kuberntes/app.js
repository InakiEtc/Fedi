var express = require('express');
var app = express();
var port = 3000;
app.listen(port, function () {
    console.log("Se levanto el server en http://localhost:" + port);
});
var requestIp = require('request-ip');
app.get('/', function (req, res) {
    var clientIp = requestIp.getClientIp(req);
    res.send('prende eso?' + clientIp);
});
