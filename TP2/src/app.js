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
    var sentencia1 = "select id_producto as prod from favoritos where id_usuario = " + id + "";
    connection.query(sentencia1, function (error, results, fields) {
        if (error)
            throw error;
        for (var i = 0; i < results; i++) {
            console.log(results[i].prod);
            /*if(results[i].prod == id_producto){
              console.log("Ya esta en favoritos");
              return false;
            }*/
        }
        var sentencia = "insert into favoritos values (null," + id + "," + id_producto + ")";
        connection.query(sentencia, function (error, results, fields) {
            if (error)
                throw error;
        });
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
app.route('/usuarios/:id_usuario/compras')
    .get(function (req, res) {
    var id = req.param('id_usuario');
    var sentencia = "select compras.* from usuarios inner join compras on usuarios.id = compras.id_usuario where id_usuario = " + id + "";
    connection.query(sentencia, function (error, results, fields) {
        if (error)
            throw error;
        res.json(results);
    });
})
    .post(function (req, res) {
    var id = req.param('id_usuario');
    var idProducto = req.param('idP');
    var cant = req.param('cantidad');
    var sentencia = "select stock as stockP from productos where id=" + idProducto + "";
    connection.query(sentencia, function (error, results, fields) {
        if (error)
            throw error;
        var stock = results[0].stockP;
        if (stock >= cant && idProducto != null) {
            var sentencia1 = "insert into compras values (null," + id + "," + idProducto + "," + cant + ",now(),0,0)";
            connection.query(sentencia1, function (error, results, fields) {
                if (error)
                    throw error;
            });
            var sentencia2 = "update productos set stock= " + (stock - cant) + " where id = " + idProducto + " ";
            connection.query(sentencia2, function (error, results, fields) {
                if (error)
                    throw error;
            });
        }
        else {
            console.log("No hay stock suficiente");
        }
    });
});
