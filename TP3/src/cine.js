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
var _this = this;
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'pelaroot',
    database: 'cine',
    port: '3306'
});
var cluster = require('cluster');
var bodyParser = require('body-parser');
pool.getConnection(function (err, con) {
    if (err)
        throw err;
    console.log('Se conecto correctamente a mySQL');
});
if (cluster.isWorker) {
    process.on('message', function (reservar) {
        pool.getConnection(function (err, con) {
            con.beginTransaction(function (err) {
                if (err)
                    throw err;
                con.query("select * from funciones where vigente = 1 and fecha > now() and id = " + reservar[0] + " for update", function (err, result, fields) {
                    if (err)
                        throw err;
                    if (result[0] == null)
                        return console.log("La funcion que quiere reservar no existe");
                    var butacas = JSON.parse(result[0].butacas_disponibles);
                    con.query("select * from reservas where usuario = " + reservar[2], function (err, result, fields) {
                        if (err)
                            throw err;
                        var funciones = new Array();
                        result.forEach(function (x) {
                            funciones.push(x.funcion);
                        });
                        if (funciones.includes(reservar[0]))
                            return "Ya sacaste entradas para esta funcion";
                        if (butacas.length < reservar[1].length && reservar[1].length <= 6)
                            return "No hay butacas suficientes"; //mepa que funca mal averiguar xq
                        var arrayButacasR = new Array();
                        for (var i = 0; i < butacas.length; i++) {
                            for (var j = 0; j < reservar[1].length; j++) {
                                if (butacas[i] == reservar[1][j]) {
                                    arrayButacasR.push(reservar[1][j]);
                                    butacas.splice(i, 1);
                                }
                            }
                        }
                        butacas = JSON.stringify(butacas);
                        var stringButacasR = JSON.stringify(arrayButacasR);
                        con.query("insert into reservas values(null," + reservar[2] + "," + reservar[0] + ", '" + stringButacasR + "')", function (err, result, fields) {
                            if (err)
                                throw err;
                            console.log("Se reservo correctamente");
                            con.query("update funciones set butacas_disponibles = '" + butacas + "' where id= " + reservar[0], function (err, result, fields) {
                                if (err)
                                    throw err;
                                console.log("Se actualizo las butacas disponibles");
                            });
                            if (butacas.length == 0) {
                                con.query("update funciones set vigente = 0 and butacas_disponibles = [] where id= " + reservar[0], function (err, result, fields) {
                                    if (err)
                                        throw err;
                                });
                            }
                        });
                    });
                });
            });
        });
    });
}
else {
    var express = require('express');
    var app = express();
    var port_1 = 3000;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.listen(port_1, function () {
        console.log("Se levanto el server en http://localhost:" + port_1);
    });
    app.get('/', function (req, res) {
        res.send('prende eso?');
    });
    app.get('/funciones', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); });
    app.post('/:id_funcion/reservar', function (req, res) {
        var idF = req.param('id_funcion');
        var butacasReservar = req.body.butacas;
        var idUser = req.body.usuario;
        var reservar = new Array;
        reservar.push(idF);
        reservar.push(butacasReservar);
        reservar.push(idUser);
        var worker = cluster.fork();
        worker.send(reservar);
        worker.on('message', function (result) {
            res.status(200).send(result);
        });
    });
    app.post('/:id_funcion/cancelar_reserva', function (req, res) {
    });
}
