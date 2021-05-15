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
    Tabla.getQuery = function () {
        return this.query;
    };
    Tabla.borrarQuery = function () {
        this.query = " ";
        return this.query;
    };
    Tabla.get = function () {
        return null;
    };
    Tabla.where = function (atributo, condicion, valor) {
        if (this.getQuery().includes("where")) {
            this.query = this.query + " and ";
            this.query = this.query + atributo;
            this.query = this.query + condicion;
            this.query = this.query + valor;
        }
        else {
            this.query = this.query + " where ";
            this.query = this.query + atributo;
            this.query = this.query + condicion;
            this.query = this.query + valor;
        }
        return this;
    };
    Tabla.orderby = function (atributo, tipo) {
        this.query = this.query + " order by ";
        this.query = this.query + atributo + " ";
        this.query = this.query + tipo;
        return this;
    };
    Tabla.prototype.save = function () {
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
                        Producto.Conexion().query("select id, nombre, vendedor, precio, stock, usado from productos" + Producto.getQuery(), function (error, results, fields) {
                            if (error)
                                throw error;
                            var products = new Array();
                            results.forEach(function (x) {
                                products.push(new Producto(x.id, x.nombre, x.vendedor, x.precio, x.stock, x.usado));
                            });
                            Producto.borrarQuery();
                            resolve(products);
                        });
                    })];
            });
        });
    };
    Producto.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, nombre, vendedor, precio, stock, usado;
            return __generator(this, function (_a) {
                id = this.id;
                nombre = this.nombre;
                vendedor = this.vendedor;
                precio = this.precio;
                stock = this.stock;
                usado = this.usado;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Producto.Conexion().query("update productos set nombre = '" + nombre + "', precio = " + precio + ", stock = " + stock + ", vendedor = " + vendedor + ", usado = " + usado + " where id = " + id, function (error, results, fields) {
                            if (error)
                                throw error;
                            this.query = " ";
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
    Usuario.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Usuario.Conexion().query('select * from usuarios where id = ' + id, function (error, results, fields) {
                            if (error)
                                reject(error);
                            var u = new Usuario(results[0].id, results[0].username, results[0].saldo, results[0].calificacion_vendedor, results[0].calificacion_comprador);
                            resolve(u);
                        });
                    })];
            });
        });
    };
    Usuario.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Usuario.Conexion().query("select id, username, saldo, calificacion_vendedor, calificacion_comprador from usuarios" + Usuario.getQuery(), function (error, results, fields) {
                            if (error)
                                throw error;
                            var users = new Array();
                            results.forEach(function (x) {
                                users.push(new Usuario(x.id, x.username, x.saldo, x.calificacion_vendedor, x.calificacion_comprador));
                            });
                            Usuario.borrarQuery();
                            resolve(users);
                        });
                    })];
            });
        });
    };
    Usuario.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, username, saldo, calificacion_vendedor, calificacion_comprador;
            return __generator(this, function (_a) {
                id = this.id;
                username = this.username;
                saldo = this.saldo;
                calificacion_vendedor = this.calificacion_vendedor;
                calificacion_comprador = this.calificacion_comprador;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Producto.Conexion().query("update usuarios set username = '" + username + "', saldo = " + saldo + ", calificacion_comprador = " + calificacion_comprador + ", calificacion_vendedor = " + calificacion_vendedor + " where id = " + id, function (error, results, fields) {
                            if (error)
                                throw error;
                            this.query = " ";
                        });
                    })];
            });
        });
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
    Favorito.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Favorito.Conexion().query('select * from favoritos where id = ' + id, function (error, results, fields) {
                            if (error)
                                reject(error);
                            var f = new Favorito(results[0].id, results[0].id_usuario, results[0].id_producto);
                            resolve(f);
                        });
                    })];
            });
        });
    };
    Favorito.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Favorito.Conexion().query("select id, id_usuario, id_producto from favoritos" + Favorito.getQuery(), function (error, results, fields) {
                            if (error)
                                throw error;
                            var favs = new Array();
                            results.forEach(function (x) {
                                favs.push(new Favorito(x.id, x.id_usuario, x.id_producto));
                            });
                            Favorito.borrarQuery();
                            resolve(favs);
                        });
                    })];
            });
        });
    };
    Favorito.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, idUsuario, idProducto;
            return __generator(this, function (_a) {
                id = this.id;
                idUsuario = this.idUsuario;
                idProducto = this.idProducto;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Producto.Conexion().query("insert into favoritos values(" + id + ", " + idUsuario + ", " + idProducto + ");", function (error, results, fields) {
                            if (error)
                                throw error;
                            this.query = " ";
                        });
                    })];
            });
        });
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
    Compra.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Compra.Conexion().query('select * from compras where id = ' + id, function (error, results, fields) {
                            if (error)
                                reject(error);
                            var c = new Compra(results[0].id, results[0].id_usuario, results[0].id_producto, results[0].cantidad, results[0].fecha, results[0].comprador_calificado, results[0].vendedor_calificado);
                            resolve(c);
                        });
                    })];
            });
        });
    };
    Compra.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Compra.Conexion().query("select id, id_usuario, id_producto, cantidad, fecha, comprador_calificado, vendedor_calificado from compras" + Compra.getQuery(), function (error, results, fields) {
                            if (error)
                                throw error;
                            var buys = new Array();
                            results.forEach(function (x) {
                                buys.push(new Compra(x.id, x.id_usuario, x.id_producto, x.cantidad, x.fecha, x.comprador_calificador, x.vendedor_calificado));
                            });
                            Compra.borrarQuery();
                            resolve(buys);
                        });
                    })];
            });
        });
    };
    Compra.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, idUsuario, idProducto, cantidad, fecha, comprador_calificado, vendedor_calificado;
            return __generator(this, function (_a) {
                id = this.id;
                idUsuario = this.idUsuario;
                idProducto = this.idProducto;
                cantidad = this.cantidad;
                fecha = this.fecha;
                comprador_calificado = this.compradorCalificado;
                vendedor_calificado = this.vendedorCalificado;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Producto.Conexion().query("insert into compras values(" + id + ", " + idUsuario + ", " + idProducto + ", " + cantidad + ", " + fecha + ", " + comprador_calificado + ", " + vendedor_calificado + ");", function (error, results, fields) {
                            if (error)
                                throw error;
                            this.query = " ";
                        });
                    })];
            });
        });
    };
    return Compra;
}(Tabla));
exports.Compra = Compra;
var CalificacionVendedor = /** @class */ (function (_super) {
    __extends(CalificacionVendedor, _super);
    function CalificacionVendedor(id, idComprador, idVendedor, fecha, calificacion) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.idComprador = idComprador;
        _this.idVendedor = idVendedor;
        _this.fecha = fecha;
        _this.calificacion = calificacion;
        return _this;
    }
    CalificacionVendedor.prototype.getId = function () {
        return this.id;
    };
    CalificacionVendedor.prototype.getIdUsuario = function () {
        return this.idComprador;
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
    CalificacionVendedor.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        CalificacionVendedor.Conexion().query('select * from calificaciones_vendedores where id = ' + id, function (error, results, fields) {
                            if (error)
                                reject(error);
                            var cv = new CalificacionVendedor(results[0].id, results[0].id_comprador, results[0].id_vendedor, results[0].fecha, results[0].calificacion);
                            resolve(cv);
                        });
                    })];
            });
        });
    };
    CalificacionVendedor.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        CalificacionVendedor.Conexion().query("select id,id_comprador,id_vendedor,calificacion,fecha from calificaciones_vendedores" + CalificacionVendedor.getQuery(), function (error, results, fields) {
                            if (error)
                                throw error;
                            var seller = new Array();
                            results.forEach(function (x) {
                                seller.push(new CalificacionVendedor(x.id, x.id_comprador, x.id_vendedor, x.fecha, x.calificacion));
                            });
                            CalificacionVendedor.borrarQuery();
                            resolve(seller);
                        });
                    })];
            });
        });
    };
    CalificacionVendedor.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, idComprador, idVendedor, fecha, calificacion;
            return __generator(this, function (_a) {
                id = this.id;
                idComprador = this.idComprador;
                idVendedor = this.idVendedor;
                fecha = this.fecha;
                calificacion = this.calificacion;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (this.find(this.id) == null) {
                            Producto.Conexion().query("insert into calificaciones_vendedores values(" + id + ", " + idVendedor + ", " + idComprador + ", " + calificacion + ", '" + fecha + "');", function (error, results, fields) {
                                if (error)
                                    throw error;
                                this.query = " ";
                            });
                        }
                        else {
                            Producto.Conexion().query("update calificaciones_vendedores set id_vendedor = " + this.idVendedor + ", id_comprador = " + this.idComprador + ", calificacion = " + this.calificacion + ", fecha = '" + this.fecha + "' where id = " + this.id, function (error, results, fields) {
                                if (error)
                                    throw error;
                                this.query = " ";
                            });
                        }
                    })];
            });
        });
    };
    return CalificacionVendedor;
}(Tabla));
exports.CalificacionVendedor = CalificacionVendedor;
var CalificacionComprador = /** @class */ (function (_super) {
    __extends(CalificacionComprador, _super);
    function CalificacionComprador(id, idComprador, idVendedor, fecha, calificacion) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.idComprador = idComprador;
        _this.idVendedor = idVendedor;
        _this.calificacion = calificacion;
        _this.fecha = fecha;
        return _this;
    }
    CalificacionComprador.prototype.getId = function () {
        return this.id;
    };
    CalificacionComprador.prototype.getIdUsuario = function () {
        return this.idComprador;
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
    CalificacionComprador.find = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        CalificacionComprador.Conexion().query('select * from calificaciones_compradores where id = ' + id, function (error, results, fields) {
                            if (error)
                                reject(error);
                            var cc = new CalificacionComprador(results[0].id, results[0].id_comprador, results[0].id_vendedor, results[0].calificacion, results[0].fecha);
                            resolve(cc);
                        });
                    })];
            });
        });
    };
    CalificacionComprador.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        CalificacionComprador.Conexion().query("select id,id_comprador,id_vendedor,calificacion,fecha from calificaciones_compradores" + CalificacionComprador.getQuery(), function (error, results, fields) {
                            if (error)
                                throw error;
                            var buyer = new Array();
                            results.forEach(function (x) {
                                buyer.push(new CalificacionComprador(x.id, x.id_comprador, x.id_vendedor, x.calificacion, x.fecha));
                            });
                            CalificacionComprador.borrarQuery();
                            resolve(buyer);
                        });
                    })];
            });
        });
    };
    CalificacionComprador.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, idComprador, idVendedor, fecha, calificacion;
            return __generator(this, function (_a) {
                id = this.id;
                idComprador = this.idComprador;
                idVendedor = this.idVendedor;
                fecha = this.fecha;
                calificacion = this.calificacion;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (this.find(this.id) == null) {
                            Producto.Conexion().query("insert into calificaciones_comprador values(" + id + ", " + idComprador + ", " + idVendedor + ", " + calificacion + ", '" + fecha + "');", function (error, results, fields) {
                                if (error)
                                    throw error;
                                this.query = " ";
                            });
                        }
                        else {
                            Producto.Conexion().query("update calificaciones_vendedores set id_vendedor = " + idVendedor + ", id_comprador = " + idComprador + ", calificacion = " + calificacion + ", fecha = '" + fecha + "' where id = " + id, function (error, results, fields) {
                                if (error)
                                    throw error;
                                this.query = " ";
                            });
                        }
                    })];
            });
        });
    };
    return CalificacionComprador;
}(Tabla));
exports.CalificacionComprador = CalificacionComprador;
