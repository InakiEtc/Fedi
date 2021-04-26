import {Producto, Usuario, Favorito, Compra, CalificacionComprador, CalificacionVendedor} from "./clases";

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pelaroot',
  database : 'ecommerce'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('Se conecto correctamente a mySQL');
});

const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`Se levanto el server en http://localhost:${port}`);
})

app.get('/', (req, res) => {
  res.send('prende eso?');
})

app.get('/productos', async(req, res) => {
  var busqueda = req.param('busqueda');
  var orden = req.param('orden');
  var usado = req.param('usado');
  var p;

  if(usado != null){
    p =  Producto.where('usado','=',usado);
  }
  if(busqueda != null){
    busqueda = '"%'+busqueda+'%"';
    p =  Producto.where('nombre',' like ',busqueda);
  }
  if(orden != null){
    p =  Producto.orderby(orden,'asc');
  }
  p = await Producto.get();
  res.json(p);
})

app.route('/usuarios/:id_usuario/fav')
  .get(async function (req, res) {
    var id = req.param('id_usuario');
    var f = await Favorito.where('id_usuario','=',id).get();
    res.json(f);
  })
  .post(async function (req, res) {
    var id = req.param('id_usuario');
    var idP = req.param('idP');
    var f = await Favorito.where('id_usuario','=',id).get();

    for(let i = 0; i < f.length; i++) {
      if(f[i].id_producto == idP){
        console.log("Ya esta en favoritos");
        return;
      }
    }
    let ff = new Favorito(null,id,idP);
    ff.save();
  })
  .delete(function (req,res,next){
    var id = req.param('id_usuario');
    var id_producto = req.body.idP;
    var sentencia = "delete from favoritos where id_usuario = "+id+" and id_producto ="+id_producto+" ";

    connection.query(sentencia, function (error, results, fields){
      if (error) throw error;
    })
  });

  app.route('/usuarios/:id_usuario/compras')
  .get(async function (req, res){
    var id = req.param('id_usuario');
    var c = await Compra.where('id_usuario','=',id).get();
    res.json(c);
  })
  .post(async function (req, res) {
    var id = req.param('id_usuario');
    var idProducto = req.param('idP');
    var cant = req.param('cantidad');

    var p = await Producto.where('id','=',idProducto).get();
    var stock = p[0].stock;
    
    if(stock >= cant  && idProducto != null){
      var sentencia1 = "insert into compras values (null,"+id+","+idProducto+","+cant+",now(),0,0)";
      connection.query(sentencia1, function (error, results, fields){
        if (error) throw error;
      })
      var sentencia2 = "update productos set stock= "+(stock-cant)+" where id = "+idProducto+" ";
      connection.query(sentencia2, function (error, results, fields){
        if (error) throw error;
      })
    }
    else{
      console.log("No hay stock suficiente");
    }
  })

  app.route("/usuarios/:id_usuario/calificaciones")
  .get(async function (req, res){
    let id = req.param('id_usuario');
    var detalleCalifUser:Array<JSON> = new Array;

    var cc = await CalificacionComprador.where('id_comprador','=',id).get();
    var cv = await CalificacionVendedor.where('id_vendedor','=',id).get();  
    detalleCalifUser.push(cc,cv);

    res.json(detalleCalifUser);
  })


