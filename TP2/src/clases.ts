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

  save(){
  }
  
  where(atributo:string ,condcion:string, valor:string){
  }

  orderby(atributo:String, tipo:String){  
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
    this.query = 'select * from productos where id = '+id;
    return new Promise(function (resolve, reject){
      Producto.Conexion().query(this.query, function (error, results, fields){
        if (error) reject(error);
        var p = new Producto(results[0].id,results[0].nombre,results[0].precio,results[0].vendedor,results[0].stock,results[0].usado);
        resolve(p);
      });
    });
  }

  static async get(){
    return new Promise(function (resolve, reject){
      Producto.Conexion().query(/*query*/, function (error, results, fields){
        if (error) throw error;
        let products: Set<Producto> = new Set();
        results.forEach(x => {
          products.push(/*algo*/);
        });
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
}

export class CalificacionVendedor extends Tabla{
  id:number;
  idUsuario:number;
  idVendedor:number;
  fecha: String;
  calificacion: number;

  constructor(id:number, idUsuario:number, idVendedor:number, fecha: String, calificacion: number){
    super();
    this.id = id;
    this.idUsuario = idUsuario;
    this.idVendedor = idVendedor;
    this.fecha = fecha;
    this.calificacion = calificacion; 
  }

  getId():number{
    return this.id;
  }
  getIdUsuario():number{
    return this.idUsuario;
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
}

export class CalificacionComprador extends Tabla{
  id:number;
  idUsuario:number;
  idVendedor:number;
  fecha:string;
  calificacion: number;

  constructor(id:number, idUsuario:number, idVendedor:number, fecha:string, calificacion: number){
    super();
    this.id = id;
    this.idUsuario = idUsuario;
    this.idVendedor = idVendedor;
    this.fecha = fecha;
    this.calificacion = calificacion; 
  }

  getId():number{
    return this.id;
  }
  getIdUsuario():number{
    return this.idUsuario;
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
}