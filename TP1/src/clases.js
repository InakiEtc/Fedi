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
exports.__esModule = true;
exports.Serie = exports.Pelicula = exports.Contenido = exports.Usuario = exports.Sistema = exports.Region = void 0;
var Region;
(function (Region) {
    Region[Region["AR"] = 0] = "AR";
    Region[Region["BR"] = 1] = "BR";
    Region[Region["CH"] = 2] = "CH";
})(Region = exports.Region || (exports.Region = {}));
;
var Titulo = /** @class */ (function () {
    function Titulo(titulo) {
        this.titulo = titulo;
        this.region = new Array();
    }
    Titulo.prototype.getTitulo = function () {
        return this.titulo;
    };
    Titulo.prototype.setTitulo = function (nuevo) {
        this.titulo = nuevo;
    };
    Titulo.prototype.disponible = function (regionD) {
        for (var i = 0; i < this.region.length; i++) {
            if (this.region[i] == regionD) {
                return true;
            }
        }
        return false;
    };
    Titulo.prototype.agregarRegion = function (regionA) {
        this.region.push(regionA);
    };
    Titulo.prototype.quitarRegion = function (regionQ) {
        var i = this.region.indexOf(regionQ);
        this.region.splice(i, 1);
    };
    return Titulo;
}());
var Sistema = /** @class */ (function () {
    function Sistema() {
        this.Usuarios = new Array();
        this.Biblioteca = new Array();
    }
    Sistema.prototype.agregarUsuario = function (usuario) {
        var repetido;
        this.Usuarios.forEach(function (element) {
            if (element.getUsername() == usuario.getUsername()) {
                repetido = true;
            }
        });
        if (repetido == true) {
            return false;
        }
        else {
            this.Usuarios.push(usuario);
            return true;
        }
    };
    Sistema.prototype.agregarTitulo = function (titulo) {
        this.Biblioteca.push(titulo);
    };
    Sistema.prototype.buscarUsuario = function (nombre) {
        return this.Usuarios.find(function (Usuario) { return Usuario.getUsername() == nombre; });
    };
    Sistema.prototype.buscarTitulo = function (nombre) {
        var bibliotecaClon;
        for (var i = 0; i < this.Biblioteca.length; i++) {
            if (this.Biblioteca[i].titulo == nombre) {
                bibliotecaClon.push(this.Biblioteca[i]);
            }
        }
        return bibliotecaClon;
    };
    return Sistema;
}());
exports.Sistema = Sistema;
var Usuario = /** @class */ (function () {
    function Usuario(nombre, region) {
        this.nombre = nombre;
        this.region = region;
        this.lista = new Map();
        this.listaVista = new Array();
        this.capsVistos = new Map();
    }
    Usuario.prototype.getUsername = function () {
        return this.nombre;
    };
    Usuario.prototype.getRegion = function () {
        return this.region;
    };
    Usuario.prototype.visto = function (titulo) {
        if (titulo instanceof Pelicula) {
            if (this.listaVista.includes(titulo)) {
                return true;
            }
        }
        else if (titulo instanceof Serie) {
            if (titulo.cantidadDeCapitulos() == this.capsVistos.get(titulo)) {
                return true;
            }
        }
        return false;
    };
    Usuario.prototype.viendo = function (titulo) {
        if (titulo instanceof Pelicula) {
            if (this.lista.has(titulo)) {
                return true;
            }
        }
        else if (titulo instanceof Serie) {
            if (titulo.cantidadDeCapitulos() != this.capsVistos.get(titulo)) {
                return true;
            }
        }
        return false;
    };
    Usuario.prototype.capituloActual = function (serie) {
        if (serie instanceof Serie) {
            if (serie.cantidadDeCapitulos() == this.capsVistos.get(serie)) {
                return serie.cantidadDeCapitulos();
            }
            else if (!this.visto && !this.viendo) {
                return 0;
            }
            else if (serie.cantidadDeCapitulos() != this.capsVistos.get(serie)) {
                return this.capsVistos.get(serie) + 1;
            }
        }
    };
    Usuario.prototype.ver = function (titulo, tiempo_visualizado) {
        if (titulo instanceof Pelicula) {
            if (titulo.disponible(this.region)) {
                if (titulo.getContenido().getDuracion() == tiempo_visualizado) {
                    this.listaVista.push(titulo);
                    return true;
                }
                else if (titulo.getContenido().getDuracion() < tiempo_visualizado) {
                    return false;
                }
                else {
                    if (this.lista.has(titulo)) {
                        var tiempo = this.lista.get(titulo);
                        if (tiempo + tiempo_visualizado > titulo.getContenido().getDuracion()) {
                            return false;
                        }
                        else if (tiempo + tiempo_visualizado < titulo.getContenido().getDuracion()) {
                            this.lista.set(titulo, (tiempo + tiempo_visualizado));
                            return true;
                        }
                        else {
                            this.listaVista.push(titulo);
                            this.lista["delete"](titulo);
                            return true;
                        }
                    }
                    else {
                        this.lista.set(titulo, tiempo_visualizado);
                        return true;
                    }
                }
            }
        }
        else if (titulo instanceof Serie) {
            if (titulo.disponible(this.region)) {
                var duracionTotal = 0;
                for (var i = 0; i < titulo.cantidadDeCapitulos(); i++) {
                    duracionTotal = duracionTotal + titulo.obtenerCapitulo(i).getDuracion();
                    return true;
                }
                if (tiempo_visualizado = duracionTotal) {
                    this.listaVista.push(titulo);
                    return true;
                }
                else if (tiempo_visualizado > duracionTotal) {
                    return false;
                }
                else {
                    if (this.lista.has(titulo)) {
                        if (titulo.obtenerCapitulo(this.capituloActual(titulo)).getDuracion() == 0) {
                            var tiempoRestante = 0;
                            for (var i = this.capsVistos.get(titulo); i < titulo.cantidadDeCapitulos(); i++) {
                                if (this.capsVistos.get(titulo) == titulo.cantidadDeCapitulos()) {
                                    this.lista["delete"](titulo);
                                    this.listaVista.push(titulo);
                                    return true;
                                }
                                else {
                                    tiempoRestante = tiempo_visualizado - titulo.obtenerCapitulo(i).getDuracion();
                                    this.lista.set(titulo, tiempoRestante);
                                    this.capsVistos.set(titulo, this.capsVistos.get(titulo) + 1);
                                }
                            }
                        }
                        else {
                            tiempo_visualizado = tiempo_visualizado - (titulo.obtenerCapitulo(this.capituloActual(titulo)).getDuracion() - this.lista.get(titulo));
                            this.capsVistos.set(titulo, this.capsVistos.get(titulo) + 1);
                            var tiempoRestante = 0;
                            for (var i = this.capsVistos.get(titulo); i < titulo.cantidadDeCapitulos(); i++) {
                                if (this.capsVistos.get(titulo) == titulo.cantidadDeCapitulos()) {
                                    this.lista["delete"](titulo);
                                    this.listaVista.push(titulo);
                                    return true;
                                }
                                else {
                                    tiempoRestante = tiempo_visualizado - titulo.obtenerCapitulo(i).getDuracion();
                                    this.lista.set(titulo, tiempoRestante);
                                    this.capsVistos.set(titulo, this.capsVistos.get(titulo) + 1);
                                }
                            }
                        }
                    }
                    else {
                        var tiempoRestante = 0;
                        var vueltas = 0;
                        for (var i = 0; i < titulo.cantidadDeCapitulos(); i++) {
                            if (tiempo_visualizado == 0) {
                                this.lista.set(titulo, tiempoRestante);
                                this.capsVistos.set(titulo, vueltas);
                                return true;
                            }
                            tiempoRestante = tiempo_visualizado - titulo.obtenerCapitulo(i).getDuracion();
                            vueltas++;
                        }
                    }
                }
            }
        }
        return false;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
var Contenido = /** @class */ (function () {
    function Contenido(duracion) {
        this.duracion = duracion;
        this.fechaSubida = new Date(Date.now());
    }
    Contenido.prototype.getDate = function () {
        return this.fechaSubida;
    };
    Contenido.prototype.getDuracion = function () {
        return this.duracion;
    };
    return Contenido;
}());
exports.Contenido = Contenido;
var Pelicula = /** @class */ (function (_super) {
    __extends(Pelicula, _super);
    function Pelicula(titulo) {
        return _super.call(this, titulo) || this;
    }
    Pelicula.prototype.getContenido = function () {
        return this.contenido;
    };
    Pelicula.prototype.setContenido = function (contenidoN) {
        this.contenido = contenidoN;
    };
    return Pelicula;
}(Titulo));
exports.Pelicula = Pelicula;
var Serie = /** @class */ (function (_super) {
    __extends(Serie, _super);
    function Serie(titulo) {
        var _this = _super.call(this, titulo) || this;
        _this.contenido = new Array();
        return _this;
    }
    Serie.prototype.agregarCapitulo = function (capitulo) {
        this.contenido.push(capitulo);
    };
    Serie.prototype.obtenerCapitulo = function (capitulo) {
        for (var i = 0; i < this.contenido.length; i++) {
            if (capitulo == this.contenido.indexOf(this.contenido[i])) {
                var capObtenido = this.contenido[i];
                return capObtenido;
            }
        }
    };
    Serie.prototype.cantidadDeCapitulos = function () {
        var cantCap = 0;
        for (var i = 0; i < this.contenido.length; i++) {
            cantCap = cantCap + 1;
        }
        return cantCap;
    };
    Serie.prototype.primerCapitulo = function () {
        var capitulo1 = this.contenido[0];
        return capitulo1;
    };
    return Serie;
}(Titulo));
exports.Serie = Serie;
