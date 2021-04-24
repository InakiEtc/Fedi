var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pelaroot',// 'alumnoipm',
  database : 'ecommerce'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('Se conecto correctamente a mySQL');
})

export abstract class Tabla{
  nombreTabla: String;
  query: String;

  constructor(nombre: String){
    this.nombreTabla = nombre;
  }

  find(id:number){
    this.query = 'select * from '+this.nombreTabla+' where id = '+id;

    connection.query(this.query, function (error, results, fields){
        if (error) throw error;
        return results[0];   
    })
    return null;
  }

  save(){
      /*?*/
  }
  
  where(){
      /*?*/
  }

  orderby(atributo:String, tipo:String){  
    this.query+="order by "+atributo+" "+tipo;
  }
}

export class Usuario extends Tabla{
  id:number;
  username:string;
  saldo:number;
  calificacion_vendedor:number;
  calificacion_comprador:number;

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

export class Producto extends Tabla{
  id:number;
  nombre:string;
  vendedor:number;
  precio:number;
  stock:number;
  usado: number;

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
}

export class Favorito extends Tabla{
  id:number;
  idUsuario:number;
  idProducto:number;

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
  fecha:Date;// o string??
  compradorCalificado: number;
  vendedorCalificado: number;

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
  getFecha():Date{
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
  fecha:Date;// o string??
  calificacion: number;
  
  getId():number{
    return this.id;
  }
  getIdUsuario():number{
    return this.idUsuario;
  }
  getIdVendedor():number{
    return this.idVendedor
  }
  getFecha():Date{
    return this.fecha
  }
  getCalificacion():number{
    return this.calificacion;
  }
}