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
      let cc = new Compra(null,id,idProducto,cant,'now()',0,0);
      cc.save();
      var p2 = await Producto.where('id','=',idProducto).get();
      let pp = new Producto(idProducto,p2[0].nombre,p2[0].vendedor,p2[0].precio,stock-1,p2[0].usado);
      pp.save();
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
  .post(function (req, res) {
    let id_usuario = req.params.id_usuario;
    let id_calificante = req.body.id_calificante;
    let id_operacion = req.body.id_operacion;
    let id_calificacion = req.body.id_calificacion;
    let id_vendedor = req.body.id_vendedor; 
    let id_comprador = req.body.id_comprador;


    connection.query('SELECT compras.id_usuario as id_comprador , vendedor as id_vendedor FROM productos INNER JOIN compras ON productos.id=id_producto WHERE compras.id = '+id_operacion+';', function (error, resultsQuery1, fields) {
        if (error) throw error;
        if(resultsQuery1[0].id_comprador==id_usuario){

            connection.query("Insert into calificaciones_compradores values (null, "+id_usuario+","+resultsQuery1[0].id_vendedor+","+id_calificacion+", NOW());", function (error, results, field){
              if(error){
                throw error;
            }
            else{
                res.send('InsertadE');
            }

            })
        }
        else {
            connection.query("Insert into calificaciones_vendedores values (null, "+id_usuario+","+resultsQuery1[0].id_comprador+","+id_calificacion+", NOW());", function (error, results, field){
              if(error){
                throw error;
            }
            else{
                res.send('InsertadE');
            }
            })
        }
    });
})



