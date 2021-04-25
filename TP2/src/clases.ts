abstract class Tabla{
  protected static query:String = " ";
  
  public static Conexion(){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'pelaroot',
    database : 'ecommerce'
    });

    return connection;
  }

  static Query():String{
    return this.query;
  }

  static get(){
    return null;
  }
  
  static where(atributo:string ,condicion:string, valor:string){
    if(this.Query().includes("where")){
      this.query = this.query +" and ";
      this.query = this.query + atributo;
      this.query = this.query + condicion;
      this.query = this.query + valor;
    }
    else{
      this.query = this.query +" where ";
      this.query = this.query + atributo;
      this.query = this.query + condicion;
      this.query = this.query + valor;
    }
    return this;
  }

  static orderby(atributo:string, tipo:string){  
    this.query = this.query +" order by ";
    this.query = this.query + atributo +" ";
    this.query = this.query + tipo;

    return this;
  }

  save(){
  }
}

export class Producto extends Tabla{
  id:number;
  nombre:string;
  vendedor:number;
  precio:number;
  stock:number;
  usado: number;

  constructor(id:number, nombre:string, vendedor:number, precio:number, stock:number, usado: number){
    super();
    this.id = id;
    this.nombre = nombre;
    this.vendedor = vendedor;
    this.precio = precio;
    this.stock = stock;
    this.usado = usado;
  }

  getId():number{
    return this.id;
  }
  getNombre():String{
    return this.nombre;
  }
  getPrecio():number{
    return this.precio;
  }
  getVendedor():number{
    return this.vendedor;
  }
  getStock():number{
    return this.stock;
  }
  getUsado():number{
    return this.usado;
  }

  static async find(id:number){
    return new Promise(function (resolve, reject){
      Producto.Conexion().query('select * from productos where id = '+id, function (error, results, fields){
        if (error) reject(error);
        let p = new Producto(results[0].id,results[0].nombre,results[0].precio,results[0].vendedor,results[0].stock,results[0].usado);
        resolve(p);
      });
    });
  }

  static async get(){
    return new Promise(function (resolve, reject){
      Producto.Conexion().query("select id, nombre, vendedor, precio, stock, usado from productos"+ Producto.Query(), function (error, results, fields){
        if (error) throw error;
        let products: Array<Producto> = new Array();
        results.forEach(x => {
          products.push(x.id ,x.nombre, x.vendedor, x.precio, x.stock, x.usado);
        });
        this.query = " ";
        resolve(products);
      });
    });
  }

}

export class Usuario extends Tabla{
  id:number;
  username:string;
  saldo:number;
  calificacion_vendedor:number;
  calificacion_comprador:number;

  constructor(id:number, username:string, saldo:number, calificacion_vendedor:number, calificacion_comprador:number){
    super();
    this.id = id;
    this.username = username;
    this.saldo = saldo;
    this.calificacion_vendedor = calificacion_vendedor;
    this.calificacion_comprador = calificacion_comprador;
  }

  getId():number{
    return this.id;
  }
  getUsername():String{
    return this.username;
  }
  getSaldo():number{
    return this.saldo;
  }
  getCalificacionVendedor():number{
    return this.calificacion_vendedor;
  }
  getCalificacionComprador():number{
    return this.calificacion_comprador;
  }

  static async find(id:number){
    return new Promise(function (resolve, reject){
      Usuario.Conexion().query('select * from usuarios where id = '+id, function (error, results, fields){
        if (error) reject(error);
        let u = new Usuario(results[0].id,results[0].username,results[0].saldo,results[0].calificacion_vendedor,results[0].calificacion_comprador);
        resolve(u);
      });
    });
  }

  static async get(){
    return new Promise(function (resolve, reject){
      Usuario.Conexion().query("select id, username, saldo, calificacion_vendedor, calificacion_comprador from usuarios"+ Usuario.Query(), function (error, results, fields){
        if (error) throw error;
        let users: Array<Usuario> = new Array();
        results.forEach(x => {
          users.push(x.id ,x.username, x.saldo, x.calificacion_vendedor, x.calificacion_comprador);
        });
        this.query = " ";
        resolve(users);
      });
    });
  }

}

export class Favorito extends Tabla{
  id:number;
  idUsuario:number;
  idProducto:number;

  constructor(id:number, idUsuario:number, idProducto:number){
    super();
    this.id = id;
    this.idUsuario = idUsuario;
    this.idProducto = idProducto;
  }

  getId():number{
    return this.id;
  }
  getIdUsuario():number{
    return this.idUsuario;
  }
  getIdProducto():number{
    return this.idProducto;
  }

  static async find(id:number){
    return new Promise(function (resolve, reject){
      Favorito.Conexion().query('select * from favoritos where id = '+id, function (error, results, fields){
        if (error) reject(error);
        let f = new Favorito(results[0].id,results[0].idUsuario,results[0].idProducto);
        resolve(f);
      });
    });
  }

  static async get(){
    return new Promise(function (resolve, reject){
      Favorito.Conexion().query("select id, idUsuario, idProducto from favoritos"+ Favorito.Query(), function (error, results, fields){
        if (error) throw error;
        let favs: Array<Favorito> = new Array();
        results.forEach(x => {
          favs.push(x.id ,x.idUsuario, x.idProducto);
        });
        this.query = " ";
        resolve(favs);
      });
    });
  }

}

export class Compra extends Tabla{
  id:number;
  idUsuario:number;
  idProducto:number;
  cantidad:number;
  fecha:String;
  compradorCalificado: number;
  vendedorCalificado: number;

  constructor(id:number, idUsuario:number, idProducto:number, cantidad:number, fecha:String, compradorCalificado: number, vendedorCalificado: number){
    super();
    this.id = id;
    this.idUsuario = idUsuario;
    this.idProducto = idProducto;
    this.cantidad = cantidad;
    this.fecha = fecha;
    this.compradorCalificado = compradorCalificado;
    this.vendedorCalificado = vendedorCalificado;

  }

  getId():number{
    return this.id;
  }
  getIdUsuario():number{
    return this.idUsuario;
  }
  getIdProducto():number{
    return this.idProducto;
  }
  getCantidad():number{
    return this.cantidad;
  }
  getFecha():String{
    return this.fecha;
  }
  getCompradorCalificado():number{
    return this.compradorCalificado;
  }
  getVendedorCalificado():number{
    return this.vendedorCalificado;
  }

  static async find(id:number){
    return new Promise(function (resolve, reject){
      Compra.Conexion().query('select * from compras where id = '+id, function (error, results, fields){
        if (error) reject(error);
        let c = new Compra(results[0].id,results[0].idUsuario,results[0].idProducto,results[0].cantidad,results[0].fecha,results[0].compradorCalificado,results[0].vendedorCalificado);
        resolve(c);
      });
    });
  }

static async get(){
    return new Promise(function (resolve, reject){
      Compra.Conexion().query("select id, idUsuario, idProducto, cantidad, fecha, compradorCalificado, vendedorCalificado from compras"+ Compra.Query(), function (error, results, fields){
        if (error) throw error;
        let buys: Array<Compras> = new Array();
        results.forEach(x => {
          buys.push(x.id,x.idUsuario,x.idProducto,x.cantidad,x.fecha,x.compradorCalificado,x.vendedorCalificado);
        });
        this.query = " ";
        resolve(buys);
      });
    });
  }

}

export class CalificacionVendedor extends Tabla{
  id:number;
  idComprador:number;
  idVendedor:number;
  fecha: String;
  calificacion: number;

  constructor(id:number, idComprador:number, idVendedor:number, fecha: String, calificacion: number){
    super();
    this.id = id;
    this.idComprador = idComprador;
    this.idVendedor = idVendedor;
    this.fecha = fecha;
    this.calificacion = calificacion; 
  }

  getId():number{
    return this.id;
  }
  getIdUsuario():number{
    return this.idComprador;
  }
  getIdVendedor():number{
    return this.idVendedor;
  }
  getFecha(): String{
    return this.fecha;
  }
  getCalificacion():number{
    return this.calificacion;
  }

  static async find(id:number){
    return new Promise(function (resolve, reject){
      CalificacionVendedor.Conexion().query('select * from calificaciones_vendedores where id = '+id, function (error, results, fields){
        if (error) reject(error);
        let cv = new CalificacionVendedor(results[0].id,results[0].idComprador,results[0].idVendedor,results[0].fecha, results[0].calificacion);
        resolve(cv);
      });
    });
  }

static async get(){
    return new Promise(function (resolve, reject){
      CailificacionVendedor.Conexion().query("select id,idComprador,idVendedor,calificacion,fecha from calificaciones_vendedores"+ CalificacionVendedor.Query(), function (error, results, fields){
        if (error) throw error;
        let seller: Array<CalificacionVendedor> = new Array();
        results.forEach(x => {
          seller.push(x.id,x.idComprador,x.idVendedor, x.fecha,x.calificacion);
        });
        this.query = " ";
        resolve(seller);
      });
    });
}

export class CalificacionComprador extends Tabla{
  id:number;
  idComprador:number;
  idVendedor:number;
  fecha:string;
  calificacion: number;

  constructor(id:number, idComprador:number, idVendedor:number, fecha:string, calificacion: number){
    super();
    this.id = id;
    this.idComprador = idComprador;
    this.idVendedor = idVendedor;
    this.fecha = fecha;
    this.calificacion = calificacion; 
  }

  getId():number{
    return this.id;
  }
  getIdUsuario():number{
    return this.idComprador;
  }
  getIdVendedor():number{
    return this.idVendedor;
  }
  getFecha():string{
    return this.fecha;
  }
  getCalificacion():number{
    return this.calificacion;
  }

  static async find(id:number){
    return new Promise(function (resolve, reject){
      CalificacionComprador.Conexion().query('select * from calificaciones_compradores where id = '+id, function (error, results, fields){
        if (error) reject(error);
        let cc = new CalificacionComprador(results[0].id,results[0].idComprador,results[0].idVendedor,results[0].calificacion,results[0].fecha);
        resolve(cc);
      });
    });
  }

static async get(){
    return new Promise(function (resolve, reject){
      CailificacionComprador.Conexion().query("select id,idComprador,idVendedor,calificacion,fecha from calificaciones_compradores"+ CalificacionComprador.Query(), function (error, results, fields){
        if (error) throw error;
        let buyer: Array<CalificacionComprador> = new Array();
        results.forEach(x => {
          buyer.push(x.id,x.idComprador,x.idVendedor,x.calificacion,x.fecha);
        });
        this.query = " ";
        resolve(buyer);
      });
    });

}