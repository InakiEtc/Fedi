var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pelaroot',
    database: 'ecommerce'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Se conecto correctamente a mySQL');
});
var express = require('express');
var app = express();
var port = 3000;
app.listen(port, function () {
    console.log("Se levanto el server en http://localhost:" + port);
});
app.get('/', function (req, res) {
    res.send('prende eso?');
});
