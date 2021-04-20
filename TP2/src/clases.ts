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
  private nombreTabla: String;
  private query:String;

  private find(id:number){
    this.query = 'select * from '+this.nombreTabla+' where id = '+id;

    connection.query(this.query, function (error, results, fields){
        if (error) throw error;
        return results[0];   
    })
    return null;
  }

  private save(){
      /*?*/
  }
  
  private where(){
      /*?*/
  }

  private orderby(atributo:String, tipo:String){  
    this.query+="order by "+atributo+" "+tipo;
  }

  private get(){
    connection.query(this.query, function (error, results, fields){
        if (error) throw error;
        return results;   
    })
    return null;
  }
}

export class Usuario extends Tabla{
  private id:number;
  private username:string;
  private saldo:number;
  private calificacion_vendedor:number;
  private calificacion_comprador:number;

  public getId():number{
    return this.id;
  }
  public getUsername():String{
    return this.username;
  }
  public getSaldo():number{
    return this.saldo;
  }
  public getCalificacionVendedor():number{
    return this.calificacion_vendedor;
  }
  public getCalificacionComprador():number{
    return this.calificacion_comprador;
  }
}

export class Producto extends Tabla{
  private id:number;
  private nombre:string;
  private vendedor:number;
  private precio:number;
  private stock:number;
  private usado: number;

  public getId():number{
    return this.id;
  }
  public getNombre():String{
    return this.nombre;
  }
  public getPrecio():number{
    return this.precio;
  }
  public getVendedor():number{
    return this.vendedor;
  }
  public getStock():number{
    return this.stock;
  }
  public getUsado():number{
    return this.usado;
  }
}

export class Favorito extends Tabla{
  private id:number;
  private idUsuario:number;
  private idProducto:number;

  public getId():number{
    return this.id;
  }
  public getIdUsuario():number{
    return this.idUsuario;
  }
  public getIdProducto():number{
    return this.idProducto;
  }
}

export class Compra extends Tabla{
  private id:number;
  private idUsuario:number;
  private idProducto:number;
  private cantidad:number;
  private fecha:Date;// o string??
  private compradorCalificado: number;
  private vendedorCalificado: number;

  public getId():number{
    return this.id;
  }
  public getIdUsuario():number{
    return this.idUsuario;
  }
  public getIdProducto():number{
    return this.idProducto;
  }
  public getCantidad():number{
    return this.cantidad;
  }
  public getFecha():Date{
    return this.fecha;
  }
  public getCompradorCalificado():number{
    return this.compradorCalificado;
  }
  public getVendedorCalificado():number{
    return this.vendedorCalificado;
  }
}

export class CalificacionVendedor extends Tabla{
  private id:number;
  private idUsuario:number;
  private idVendedor:number;
  private fecha:Date// o string??
  private calificacion: number;
  
  public getId():number{
    return this.id;
  }
  public getIdUsuario():number{
    return this.idUsuario;
  }
  public getIdVendedor():number{
    return this.idVendedor;
  }
  public getFecha():Date{
    return this.fecha;
  }
  public getCalificacion():number{
    return this.calificacion;
  }
}

export class CalificacionComprador extends Tabla{
  private id:number;
  private idUsuario:number;
  private idVendedor:number;
  private fecha:Date;// o string??
  private calificacion: number;
  
  public getId():number{
    return this.id;
  }
  public getIdUsuario():number{
    return this.idUsuario;
  }
  public getIdVendedor():number{
    return this.idVendedor
  }
  public getFecha():Date{
    return this.fecha
  }
  public getCalificacion():number{
    return this.calificacion;
  }
}