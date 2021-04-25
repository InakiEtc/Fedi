"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CalificacionComprador = exports.CalificacionVendedor = exports.Compra = exports.Favorito = exports.Usuario = exports.Producto = void 0;
var Tabla = /** @class */ (function () {
    function Tabla() {
    }
    Tabla.Conexion = function () {
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'pelaroot',
            database: 'ecommerce'
        });
        return connection;
    };
    Tabla.Query = function () {
        return this.query;
    };
    Tabla.prototype.save = function () {
    };
    Tabla.prototype.where = function (atributo, condcion, valor) {
    };
    Tabla.prototype.orderby = function (atributo, tipo) {
    };
    Tabla.query = " ";
    return Tabla;
}());
var Producto = /** @class */ (function (_super) {
    __extends(Producto, _super);
    function Producto(id, nombre, vendedor, precio, stock, usado) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.nombre = nombre;
        _this.vendedor = vendedor;
        _this.precio = precio;
        _this.stock = stock;
        _this.usado = usado;
        return _this;
    }
    Producto.prototype.getId = function () {
        return this.id;
    };
    Producto.prototype.getNombre = function () {
        return this.nombre;
    };
    Producto.prototype.getPrecio = function () {
        return this.precio;
    };
    Producto.prototype.getVendedor = function () {
        return this.vendedor;
    };
    Producto.prototype.getStock = function () {
        return this.stock;
    };
    Producto.prototype.getUsado = function () {
        return this.usado;
    };
    Producto.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Producto.Conexion().query('select * from productos where id = ' + id, function (error, results, fields) {
                            if (error)
                                reject(error);
                            var p = new Producto(results[0].id, results[0].nombre, results[0].precio, results[0].vendedor, results[0].stock, results[0].usado);
                            resolve(p);
                        });
                    })];
            });
        });
    };
    Producto.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Producto.Conexion().query("select id, nombre, vendedor, precio, stock, usado from productos" + Producto.Query(), function (error, results, fields) {
                            if (error)
                                throw error;
                            var products = new Array();
                            results.forEach(function (x) {
                                products.push(x.id, x.nombre, x.vendedor, x.precio, x.stock, x.usado);
                            });
                            resolve(products);
                        });
                    })];
            });
        });
    };
    return Producto;
}(Tabla));
exports.Producto = Producto;
var Usuario = /** @class */ (function (_super) {
    __extends(Usuario, _super);
    function Usuario(id, username, saldo, calificacion_vendedor, calificacion_comprador) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.username = username;
        _this.saldo = saldo;
        _this.calificacion_vendedor = calificacion_vendedor;
        _this.calificacion_comprador = calificacion_comprador;
        return _this;
    }
    Usuario.prototype.getId = function () {
        return this.id;
    };
    Usuario.prototype.getUsername = function () {
        return this.username;
    };
    Usuario.prototype.getSaldo = function () {
        return this.saldo;
    };
    Usuario.prototype.getCalificacionVendedor = function () {
        return this.calificacion_vendedor;
    };
    Usuario.prototype.getCalificacionComprador = function () {
        return this.calificacion_comprador;
    };
    return Usuario;
}(Tabla));
exports.Usuario = Usuario;
var Favorito = /** @class */ (function (_super) {
    __extends(Favorito, _super);
    function Favorito(id, idUsuario, idProducto) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.idUsuario = idUsuario;
        _this.idProducto = idProducto;
        return _this;
    }
    Favorito.prototype.getId = function () {
        return this.id;
    };
    Favorito.prototype.getIdUsuario = function () {
        return this.idUsuario;
    };
    Favorito.prototype.getIdProducto = function () {
        return this.idProducto;
    };
    return Favorito;
}(Tabla));
exports.Favorito = Favorito;
var Compra = /** @class */ (function (_super) {
    __extends(Compra, _super);
    function Compra(id, idUsuario, idProducto, cantidad, fecha, compradorCalificado, vendedorCalificado) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.idUsuario = idUsuario;
        _this.idProducto = idProducto;
        _this.cantidad = cantidad;
        _this.fecha = fecha;
        _this.compradorCalificado = compradorCalificado;
        _this.vendedorCalificado = vendedorCalificado;
        return _this;
    }
    Compra.prototype.getId = function () {
        return this.id;
    };
    Compra.prototype.getIdUsuario = function () {
        return this.idUsuario;
    };
    Compra.prototype.getIdProducto = function () {
        return this.idProducto;
    };
    Compra.prototype.getCantidad = function () {
        return this.cantidad;
    };
    Compra.prototype.getFecha = function () {
        return this.fecha;
    };
    Compra.prototype.getCompradorCalificado = function () {
        return this.compradorCalificado;
    };
    Compra.prototype.getVendedorCalificado = function () {
        return this.vendedorCalificado;
    };
    return Compra;
}(Tabla));
exports.Compra = Compra;
var CalificacionVendedor = /** @class */ (function (_super) {
    __extends(CalificacionVendedor, _super);
    function CalificacionVendedor(id, idUsuario, idVendedor, fecha, calificacion) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.idUsuario = idUsuario;
        _this.idVendedor = idVendedor;
        _this.fecha = fecha;
        _this.calificacion = calificacion;
        return _this;
    }
    CalificacionVendedor.prototype.getId = function () {
        return this.id;
    };
    CalificacionVendedor.prototype.getIdUsuario = function () {
        return this.idUsuario;
    };
    CalificacionVendedor.prototype.getIdVendedor = function () {
        return this.idVendedor;
    };
    CalificacionVendedor.prototype.getFecha = function () {
        return this.fecha;
    };
    CalificacionVendedor.prototype.getCalificacion = function () {
        return this.calificacion;
    };
    return CalificacionVendedor;
}(Tabla));
exports.CalificacionVendedor = CalificacionVendedor;
var CalificacionComprador = /** @class */ (function (_super) {
    __extends(CalificacionComprador, _super);
    function CalificacionComprador(id, idUsuario, idVendedor, fecha, calificacion) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.idUsuario = idUsuario;
        _this.idVendedor = idVendedor;
        _this.fecha = fecha;
        _this.calificacion = calificacion;
        return _this;
    }
    CalificacionComprador.prototype.getId = function () {
        return this.id;
    };
    CalificacionComprador.prototype.getIdUsuario = function () {
        return this.idUsuario;
    };
    CalificacionComprador.prototype.getIdVendedor = function () {
        return this.idVendedor;
    };
    CalificacionComprador.prototype.getFecha = function () {
        return this.fecha;
    };
    CalificacionComprador.prototype.getCalificacion = function () {
        return this.calificacion;
    };
    return CalificacionComprador;
}(Tabla));
exports.CalificacionComprador = CalificacionComprador;