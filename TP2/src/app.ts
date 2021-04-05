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
 
  console.log('connected to mySQL');
});

const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`se levanto el server en http://localhost:${port}`);
})

app.get('/', (req, res) => {
  res.send('prende eso?');
})

app.get('/productos', (req, res) => {
  var sentencia = "select * from productos ";
  var busqueda = req.param('busqueda');
  var orden = req.param('orden');
  var usado = req.param('usado');

  if(usado != null){
    sentencia = sentencia + 'where usado = '+ usado;
  }
  if(busqueda != null && usado == null){
    busqueda = '%'+busqueda+'%';
    sentencia = sentencia + 'where nombre like '+ "'" +busqueda+ "'" ;
  }
  if(busqueda != null && usado != null){
    busqueda = '%'+busqueda+'%';
    sentencia = sentencia + ' and nombre like '+ "'" +busqueda+ "'" ;
  }
  if(orden != null){
    sentencia = sentencia + ' order by '+ orden +' asc';
  }

  var query = connection.query(sentencia, function (error, results, fields){
    if (error) throw error;
      res.json(results);
      console.log(query.sql);
  });
})