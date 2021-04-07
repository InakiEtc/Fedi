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
app.get('/productos', function (req, res) {
    var sentencia = "select * from productos ";
    var busqueda = req.param('busqueda');
    var orden = req.param('orden');
    var usado = req.param('usado');
    if (usado != null) {
        sentencia = sentencia + 'where usado = ' + usado;
    }
    if (busqueda != null && usado == null) {
        busqueda = '%' + busqueda + '%';
        sentencia = sentencia + 'where nombre like ' + "'" + busqueda + "'";
    }
    if (busqueda != null && usado != null) {
        busqueda = '%' + busqueda + '%';
        sentencia = sentencia + ' and nombre like ' + "'" + busqueda + "'";
    }
    if (orden != null) {
        sentencia = sentencia + ' order by ' + orden + ' asc';
    }
    connection.query(sentencia, function (error, results, fields) {
        if (error)
            throw error;
        res.json(results);
    });
});
app.post('/usuarios/:id_usuario/fav', function (req, res) {
    var id = req.param('id_usuario');
    var id_producto = req.param('idP');
    var sentencia = "insert into favoritos values (null," + id + "," + id_producto + ")";
    connection.query(sentencia, function (error, results, fields) {
        if (error)
            throw error;
        res.json(results);
    });
});
app.route('/usuarios/:id_usuario/fav')
    .get(function (req, res) {
    var id = req.param('id_usuario');
    var sentencia = "select * from favoritos where id_usuario = " + id + "";
    connection.query(sentencia, function (error, results, fields) {
        if (error)
            throw error;
        res.json(results);
    });
})
    .post(function (req, res) {
    var id = req.param('id_usuario');
    var id_producto = req.param('idP');
    var sentencia = "insert into favoritos values (null," + id + "," + id_producto + ")";
    connection.query(sentencia, function (error, results, fields) {
        if (error)
            throw error;
    });
})["delete"](function (req, res, next) {
    var id = req.param('id_usuario');
    var id_producto = req.param('idP');
    var sentencia = "delete from favoritos where id_usuario = " + id + " and id_producto =" + id_producto + " ";
    connection.query(sentencia, function (error, results, fields) {
        if (error)
            throw error;
    });
});
