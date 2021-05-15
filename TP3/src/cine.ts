function Conexion(){
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pelaroot',
  database : 'cine'
  });

  return connection;
}

Conexion().connect(function(err) {
  if (err) throw err;
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

function funcionesDisponibles(){ 
  return new Promise(function (resolve, reject){
      Conexion().query("select titulo from funciones where vigente = 1 and fecha > now()", function (error, results, fields){
        if (error) throw error;
        resolve(results)
      });
  });
}

app.get('/funciones', async (req, res) => {
  let funciones = await funcionesDisponibles();
  res.json(funciones);
})

app.post('/:id_funcion/reservar', (req, res) => {
    
})

app.post('/:id_funcion/cancelar_reserva', (req, res) => {
    
})

