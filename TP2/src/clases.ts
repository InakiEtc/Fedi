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

  static getQuery():String{
    return this.query;
  }

  static borrarQuery():String{
    this.query = " ";
    return this.query;
  }

  static get(){
    return null;
  }
  
  static where(atributo:string ,condicion:string, valor:string){
    if(this.getQuery().includes("where")){
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
      Producto.Conexion().query("select id, nombre, vendedor, precio, stock, usado from productos"+ Producto.getQuery(), function (error, results, fields){
        if (error) throw error;
        let products: Array<Producto> = new Array();
        results.forEach(x => {
          products.push(new Producto(x.id ,x.nombre, x.vendedor, x.precio, x.stock, x.usado));
        });
        Producto.borrarQuery();
        resolve(products);
      });
    });        
  }

  async save(){ 
    let id = this.id;
    let nombre = this.nombre;
    let vendedor = this.vendedor;
    let precio = this.precio;
    let stock = this.stock;
    let usado = this.usado;
    return new Promise(function (resolve, reject){
      Producto.Conexion().query("update productos set nombre = '"+nombre+"', precio = "+precio+", stock = "+stock+", vendedor = "+vendedor+", usado = "+usado+" where id = "+id, function (error, results, fields){
        if (error) throw error;
          this.query = " ";
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
      Usuario.Conexion().query("select id, username, saldo, calificacion_vendedor, calificacion_comprador from usuarios"+ Usuario.getQuery(), function (error, results, fields){
        if (error) throw error;
        let users: Array<Usuario> = new Array();
        results.forEach(x => {
          users.push(new Usuario(x.id ,x.username, x.saldo, x.calificacion_vendedor, x.calificacion_comprador));
        });
        Usuario.borrarQuery();
        resolve(users);
      });
    });
  }

  async save(){
    let id = this.id;
    let username=this.username;
    let saldo=this.saldo;
    let calificacion_vendedor=this.calificacion_vendedor;
    let calificacion_comprador=this.calificacion_comprador;

    return new Promise(function (resolve, reject){
      Producto.Conexion().query("update usuarios set username = '"+username+"', saldo = "+saldo+", calificacion_comprador = "+calificacion_comprador+", calificacion_vendedor = "+calificacion_vendedor+" where id = "+id, function (error, results, fields){
        if (error) throw error;
          this.query = " ";
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
        let f = new Favorito(results[0].id, results[0].id_usuario, results[0].id_producto);
        resolve(f);
      });
    });
  }

  static async get(){
    return new Promise(function (resolve, reject){
      Favorito.Conexion().query("select id, id_usuario, id_producto from favoritos"+ Favorito.getQuery(), function (error, results, fields){
        if (error) throw error;
        let favs: Array<Favorito> = new Array();
        results.forEach(x => {
          favs.push(new Favorito(x.id ,x.id_usuario, x.id_producto));
        });
        Favorito.borrarQuery();
        resolve(favs);
      });
    });
  }

  async save(){
    let id = this.id;
    let idUsuario=this.idUsuario;
    let idProducto=this.idProducto;
    return new Promise(function (resolve, reject){
      Producto.Conexion().query("insert into favoritos values("+id+", "+idUsuario+", "+idProducto+");", function (error, results, fields){
        if (error) throw error;
          this.query = " ";
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
        let c = new Compra(results[0].id,results[0].id_usuario,results[0].id_producto,results[0].cantidad,results[0].fecha,results[0].comprador_calificado,results[0].vendedor_calificado);
        resolve(c);
      });
    });
  }

  static async get(){
    return new Promise(function (resolve, reject){
      Compra.Conexion().query("select id, id_usuario, id_producto, cantidad, fecha, comprador_calificado, vendedor_calificado from compras"+ Compra.getQuery(), function (error, results, fields){
        if (error) throw error;
        let buys: Array<Compra> = new Array();
        results.forEach(x => {
          buys.push(new Compra(x.id,x.id_usuario,x.id_producto,x.cantidad,x.fecha,x.comprador_calificador,x.vendedor_calificado));
        });
        Compra.borrarQuery();
        resolve(buys);
      });
    });
  }
  async save(){
    let id = this.id;
    let idUsuario=this.idUsuario;
    let idProducto=this.idProducto;
    let cantidad=this.cantidad;
    let fecha=this.fecha;
    let comprador_calificado=this.compradorCalificado;
    let vendedor_calificado=this.vendedorCalificado;

    return new Promise(function (resolve, reject){
      Producto.Conexion().query("insert into compras values("+id+", "+idUsuario+", "+idProducto+", "+cantidad+", "+fecha+", "+comprador_calificado+", "+vendedor_calificado+");", function (error, results, fields){
        if (error) throw error;
          this.query = " ";
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
        let cv = new CalificacionVendedor(results[0].id,results[0].id_comprador,results[0].id_vendedor,results[0].fecha, results[0].calificacion);
        resolve(cv);
      });
    });
  }

  static async get(){
      return new Promise(function (resolve, reject){
        CalificacionVendedor.Conexion().query("select id,id_comprador,id_vendedor,calificacion,fecha from calificaciones_vendedores"+ CalificacionVendedor.getQuery(), function (error, results, fields){
          if (error) throw error;
          let seller: Array<CalificacionVendedor> = new Array();
          results.forEach(x => {
            seller.push(new CalificacionVendedor(x.id,x.id_comprador,x.id_vendedor, x.fecha,x.calificacion));
          });
          CalificacionVendedor.borrarQuery();
          resolve(seller);
        });
      });
  }
  async save(){
    let id = this.id;
    let idComprador=this.idComprador;
    let idVendedor=this.idVendedor;
    let fecha=this.fecha;
    let calificacion=this.calificacion; 
    return new Promise(function (resolve, reject){
      if(this.find(this.id) == null){
        Producto.Conexion().query("insert into calificaciones_vendedores values("+id+", "+idVendedor+", "+idComprador+", "+calificacion+", '"+this.fecha+"');", function (error, results, fields){
          if (error) throw error;
            this.query = " ";
        });
      }else{
        Producto.Conexion().query("update calificaciones_vendedores set id_vendedor = "+this.idVendedor+", id_comprador = "+this.idComprador+", calificacion = "+this.calificacion+", fecha = '"+this.fecha+"' where id = "+this.id, function (error, results, fields){
          if (error) throw error;
            this.query = " ";
        });
      }
    });
  }
}

export class CalificacionComprador extends Tabla{
  id:number;
  idComprador:number;
  idVendedor:number;
  calificacion: number;
  fecha:string;
  

  constructor(id:number, idComprador:number, idVendedor:number, fecha:string, calificacion: number){
    super();
    this.id = id;
    this.idComprador = idComprador;
    this.idVendedor = idVendedor;
    this.calificacion = calificacion; 
    this.fecha = fecha;
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
        let cc = new CalificacionComprador(results[0].id,results[0].id_comprador,results[0].id_vendedor,results[0].calificacion,results[0].fecha);
        resolve(cc);
      });
    });
  }

  static async get(){
      return new Promise(function (resolve, reject){
        CalificacionComprador.Conexion().query("select id,id_comprador,id_vendedor,calificacion,fecha from calificaciones_compradores"+ CalificacionComprador.getQuery(), function (error, results, fields){
          if (error) throw error;
          let buyer: Array<CalificacionComprador> = new Array();
          results.forEach(x => {
            buyer.push(new CalificacionComprador(x.id,x.id_comprador,x.id_vendedor,x.calificacion,x.fecha));
          });
          CalificacionComprador.borrarQuery();
          resolve(buyer);
        });
      });
  }
  async save(){
    let id=this.id;
    let idComprador=this.idComprador;
    let idVendedor=this.idVendedor;
    let fecha=this.fecha;
    let calificacion=this.calificacion;

    return new Promise(function (resolve, reject){
      if(this.find(this.id) == null){
        Producto.Conexion().query("insert into calificaciones_comprador values("+id+", "+idComprador+", "+idVendedor+", "+calificacion+", '"+fecha+"');", function (error, results, fields){
          if (error) throw error;
            this.query = " ";
        });
      }else{
        Producto.Conexion().query("update calificaciones_vendedores set id_vendedor = "+idVendedor+", id_comprador = "+idComprador+", calificacion = "+calificacion+", fecha = '"+fecha+"' where id = "+id, function (error, results, fields){
          if (error) throw error;
            this.query = " ";
        });
      }
    });
  }
}