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
    host: 'e-commerce.cqes2fuqkcq9.sa-east-1.rds.amazonaws.com',
    user: 'pelaroot',
    password: 'pelaroot',
    database: 'e-commerce'
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
var requestIp = require('request-ip');
app.get('/', function (req, res) {
    var clientIp = requestIp.getClientIp(req);
    res.send('prende eso?' + clientIp);
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
    return __awaiter(this, void 0, void 0, function () {
        var id, idP, f, i, ff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.param('id_usuario');
                    idP = req.body.idP;
                    return [4 /*yield*/, clases_1.Favorito.where('id_usuario', '=', id).get()];
                case 1:
                    f = _a.sent();
                    for (i = 0; i < f.length; i++) {
                        if (f[i].id_producto == idP) {
                            console.log("Ya esta en favoritos");
                            return [2 /*return*/];
                        }
                    }
                    ff = new clases_1.Favorito(null, id, idP);
                    ff.save();
                    return [2 /*return*/];
            }
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
    return __awaiter(this, void 0, void 0, function () {
        var id, idProducto, cant, p, stock, cc, p2, pp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.param('id_usuario');
                    idProducto = req.body.idP;
                    cant = req.body.cantidad;
                    return [4 /*yield*/, clases_1.Producto.where('id', '=', idProducto).get()];
                case 1:
                    p = _a.sent();
                    stock = p[0].stock;
                    if (!(stock >= cant && idProducto != null)) return [3 /*break*/, 3];
                    cc = new clases_1.Compra(null, id, idProducto, cant, 'now()', 0, 0);
                    cc.save();
                    return [4 /*yield*/, clases_1.Producto.where('id', '=', idProducto).get()];
                case 2:
                    p2 = _a.sent();
                    pp = new clases_1.Producto(idProducto, p2[0].nombre, p2[0].vendedor, p2[0].precio, stock - 1, p2[0].usado);
                    pp.save();
                    return [3 /*break*/, 4];
                case 3:
                    console.log("No hay stock suficiente");
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.route("/usuarios/:id_usuario/calificaciones")
    .get(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, detalleCalifUser, cc, cv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.param('id_usuario');
                    detalleCalifUser = new Array;
                    return [4 /*yield*/, clases_1.CalificacionComprador.where('id_comprador', '=', id).get()];
                case 1:
                    cc = _a.sent();
                    return [4 /*yield*/, clases_1.CalificacionVendedor.where('id_vendedor', '=', id).get()];
                case 2:
                    cv = _a.sent();
                    detalleCalifUser.push(cc, cv);
                    res.json(detalleCalifUser);
                    return [2 /*return*/];
            }
        });
    });
});
/*.post(function (req, res) {
  let id_usuario = req.params.id_usuario;
  let id_operacion = req.body.id_operacion;
  let id_calificacion = req.body.id_calificacion;

  connection.query('SELECT compras.id_usuario as id_comprador , vendedor as id_vendedor FROM productos INNER JOIN compras ON productos.id=id_producto WHERE compras.id = '+id_operacion+';', function (error, resultsQuery1, fields) {
      if (error) throw error;
      if(resultsQuery1[0].id_comprador==id_usuario){
        connection.query("Insert into calificaciones_compradores values (null, "+id_usuario+","+resultsQuery1[0].id_vendedor+","+id_calificacion+", NOW());", function (error, results, field){
          if(error) throw error;
        })
      }
      else {
          connection.query("Insert into calificaciones_vendedores values (null, "+id_usuario+","+resultsQuery1[0].id_comprador+","+id_calificacion+", NOW());", function (error, results, field){
            if(error) throw error;
          })
      }
  });
})*/
