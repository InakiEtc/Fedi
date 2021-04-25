"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var clases_1 = require("./clases");
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
app.get('/productos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var busqueda, orden, usado, p;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                busqueda = req.param('busqueda');
                orden = req.param('orden');
                usado = req.param('usado');
                if (usado != null) {
                    p = clases_1.Producto.where('usado', '=', usado);
                }
                if (busqueda != null) {
                    busqueda = '"%' + busqueda + '%"';
                    p = clases_1.Producto.where('nombre', ' like ', busqueda);
                }
                if (orden != null) {
                    p = clases_1.Producto.orderby(orden, 'asc');
                }
                return [4 /*yield*/, clases_1.Producto.get()];
            case 1:
                p = _a.sent();
                res.json(p);
                return [2 /*return*/];
        }
    });
}); });
app.route('/usuarios/:id_usuario/fav')
    .get(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, f;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.param('id_usuario');
                    return [4 /*yield*/, clases_1.Favorito.where('id_usuario', '=', id).get()];
                case 1:
                    f = _a.sent();
                    res.json(f);
                    return [2 /*return*/];
            }
        });
    });
})
    .post(function (req, res) {
    var id = req.param('id_usuario');
    var id_p = req.body.idP;
    var sentencia = "select id_producto from favoritos where id_usuario = " + id + "";
    connection.query(sentencia, function (error, results, fields) {
        if (error)
            throw error;
        var json = (JSON.parse(JSON.stringify(results)));
        for (var i = 0; i < json.length; i++) {
            if (json[i].id_producto == id_p) {
                console.log("Ya esta en favoritos");
                return;
            }
        }
        var sentencia1 = "insert into favoritos values (null," + id + "," + id_p + ")";
        connection.query(sentencia1, function (error, results, fields) {
            if (error)
                throw error;
        });
    });
})["delete"](function (req, res, next) {
    var id = req.param('id_usuario');
    var id_producto = req.body.idP;
    var sentencia = "delete from favoritos where id_usuario = " + id + " and id_producto =" + id_producto + " ";
    connection.query(sentencia, function (error, results, fields) {
        if (error)
            throw error;
    });
});
app.route('/usuarios/:id_usuario/compras')
    .get(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, c;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.param('id_usuario');
                    return [4 /*yield*/, clases_1.Compra.where('id_usuario', '=', id).get()];
                case 1:
                    c = _a.sent();
                    res.json(c);
                    return [2 /*return*/];
            }
        });
    });
})
    .post(function (req, res) {
    var id = req.param('id_usuario');
    var idProducto = req.body.idP;
    var cant = req.body.cantidad;
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
